"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/v2");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white italic font-black text-[#1b4d2c]">
      LOADING ABRSEED V2...
    </div>
  );
}