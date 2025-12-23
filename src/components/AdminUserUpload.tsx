"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface UploadedUser {
  name: string;
  email: string;
  role?: string;
}

export default function AdminUserUpload({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleDownloadSample = () => {
    const sampleData = [
      { name: 'John Doe', email: 'john@example.com', role: 'USER' },
      { name: 'Dr. Jane Smith', email: 'jane@example.com', role: 'COUNSELLOR' },
      { name: 'Admin User', email: 'admin@example.com', role: 'ADMIN' },
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'user_upload_template.xlsx');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessage(null);
    setUploading(true);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as UploadedUser[];

      // Validate data
      const validUsers = jsonData.filter(user => user.email && user.name);
      
      if (validUsers.length === 0) {
        throw new Error("No valid users found in the Excel file. Please ensure columns 'name' and 'email' exist.");
      }

      // Send to API
      const response = await fetch('/api/admin/upload-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ users: validUsers }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload users');
      }

      setMessage({ type: 'success', text: `Successfully processed ${result.count} users.` });
      if (e.target) {
        e.target.value = ''; // Reset file input
      }
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during upload.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Upload Users via Excel</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Upload an Excel file (.xlsx, .xls) with columns: <strong>name</strong>, <strong>email</strong>, and optional <strong>role</strong> (USER, COUNSELLOR).
      </p>
      
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
        />
        <button
          onClick={handleDownloadSample}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors whitespace-nowrap"
        >
          Download Sample
        </button>
        {uploading && <span className="text-blue-600 animate-pulse">Processing...</span>}
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
