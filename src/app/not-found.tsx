import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-navy">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-slate-muted">Page Not Found</h2>
      <p className="mt-4 text-sm text-slate-muted max-w-md">
        The requested page could not be located. Please verify the URL or return to the home page.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-brand-green text-white text-sm font-medium rounded-lg hover:bg-brand-green-hover transition-colors"
      >
        Return Home
      </Link>
    </main>
  );
}
