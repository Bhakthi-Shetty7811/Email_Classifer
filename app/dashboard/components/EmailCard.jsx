'use client'
export default function EmailCard({ email }) {
  const cat = email.category || 'Unclassified'
  const colorMap = {
    Important: 'bg-red-100 text-red-700',
    Promotions: 'bg-yellow-100 text-yellow-800',
    Social: 'bg-indigo-100 text-indigo-800',
    Marketing: 'bg-emerald-100 text-emerald-800',
    Spam: 'bg-rose-100 text-rose-800',
    General: 'bg-slate-100 text-slate-800',
    Unclassified: 'bg-slate-50 text-slate-700'
  }
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium">{email.subject || '(no subject)'}</div>
          <div className="text-sm text-slate-500">{email.from || ''}</div>
        </div>
        <div>
          <span className={`px-3 py-1 rounded text-sm ${colorMap[cat] || colorMap.Unclassified}`}>{cat}</span>
        </div>
      </div>
      <div className="mt-3 text-sm text-slate-700">{email.snippet}</div>
    </div>
  )
}
