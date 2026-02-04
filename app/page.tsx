"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect otomatis ke folder v2
    router.push("/v2");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse font-black text-[#1b4d2c] italic uppercase tracking-tighter">
        Redirecting to Abraseed V2...
      </div>
    </div>
  );
}