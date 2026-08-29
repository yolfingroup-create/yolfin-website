export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-8 h-8 border-3 border-brand-green border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-muted">Loading Yolfin Group...</p>
      </div>
    </div>
  );
}
