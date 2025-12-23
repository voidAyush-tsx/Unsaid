"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PasswordChangeCheck() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (
      session?.user?.mustChangePassword &&
      pathname !== "/auth/change-password"
    ) {
      router.replace("/auth/change-password");
    }
  }, [session, status, pathname, router]);

  return null;
}
