export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-4 w-4 rounded-full animate-pulse bg-slate-400" />
      <span className="text-sm text-slate-600">{text}</span>
    </div>
  )
}
