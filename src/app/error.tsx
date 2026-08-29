"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Router Error boundary caught:", error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-2xl font-bold text-navy">Something went wrong</h2>
      <p className="mt-2 text-sm text-slate-muted max-w-md">
        An unhandled error occurred while processing your request.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-brand-green text-white text-sm font-medium rounded-lg hover:bg-brand-green-hover transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </main>
  );
}
