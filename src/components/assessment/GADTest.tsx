"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GADTestProps {
  onClose: () => void;
}

const questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export default function GADTest({ onClose }: GADTestProps) {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    return answers.reduce((acc, curr) => (curr !== -1 ? acc + curr : acc), 0);
  };

  const getResult = (score: number) => {
    if (score <= 4) return { level: "Minimal anxiety", color: "#7AA06F", description: "Your anxiety levels seem to be within a normal range." };
    if (score <= 9) return { level: "Mild anxiety", color: "#F4A258", description: "You may be experiencing some mild anxiety. Consider monitoring your feelings." };
    if (score <= 14) return { level: "Moderate anxiety", color: "#FB8728", description: "Your anxiety levels are moderate. It might be helpful to talk to a professional." };
    return { level: "Severe anxiety", color: "#D9534F", description: "Your anxiety levels are high. We strongly recommend seeking professional support." };
  };

  const isComplete = answers.every((a) => a !== -1);

  const handleSubmit = async () => {
    if (isComplete) {
      const score = calculateScore();
      const result = getResult(score);
      
      try {
        await fetch("/api/assessment/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "GAD-7",
            score,
            level: result.level,
          }),
        });
      } catch (error) {
        console.error("Failed to save assessment result", error);
      }

      setShowResult(true);
    }
  };

  const score = calculateScore();
  const result = getResult(score);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-[#FB8728] p-2 rounded-xl">
              <Image
                src="/assessment/gad_test_icon.svg"
                alt="GAD Icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-unsaid">GAD-7 Anxiety Test</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          {!showResult ? (
            <div className="space-y-8">
              <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm mb-6">
                Over the <strong>last 2 weeks</strong>, how often have you been bothered by the following problems?
              </div>
              
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-800">
                    {qIndex + 1}. {question}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOptionSelect(qIndex, option.value)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all border-2 text-left
                          ${answers[qIndex] === option.value 
                            ? "border-[#FB8728] bg-[#FB8728]/10 text-[#FB8728]" 
                            : "border-gray-100 hover:border-gray-300 text-gray-600"
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg"
                style={{ backgroundColor: result.color }}
              >
                {score}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-gray-800" style={{ color: result.color }}>
                  {result.level}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto text-lg">
                  {result.description}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl w-full max-w-lg mt-8 text-left">
                <h4 className="font-bold text-gray-800 mb-2">What does this mean?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex justify-between"><span>0-4:</span> <span>Minimal anxiety</span></li>
                  <li className="flex justify-between"><span>5-9:</span> <span>Mild anxiety</span></li>
                  <li className="flex justify-between"><span>10-14:</span> <span>Moderate anxiety</span></li>
                  <li className="flex justify-between"><span>15-21:</span> <span>Severe anxiety</span></li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-3xl">
          {!showResult ? (
            <>
              <button 
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!isComplete}
                className={`px-8 py-2.5 rounded-xl font-bold text-white transition-all
                  ${isComplete 
                    ? "bg-[#FB8728] hover:bg-[#e07620] shadow-lg shadow-[#FB8728]/30" 
                    : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                See Results
              </button>
            </>
          ) : (
            <button 
              onClick={onClose}
              className="px-8 py-2.5 rounded-xl font-bold text-white bg-[#FB8728] hover:bg-[#e07620] shadow-lg shadow-[#FB8728]/30 transition-all"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
