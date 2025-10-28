'use client'
import Loader from '../../components/Loader'

const categories = ['All', 'Important', 'Promotions', 'Social', 'Marketing', 'Spam', 'General']

export default function Sidebar({ onFilter, onFetch, onClassify, loadingFetch }) {
  return (
    <div className="card">
      <h3 className="font-semibold mb-3">Actions</h3>
      <div className="flex flex-col gap-2">
        <button onClick={() => onFetch()} className="btn">{loadingFetch ? 'Fetching...' : 'Fetch last 15 emails'}</button>
        <button onClick={() => onClassify()} className="btn !bg-green-600">Classify Emails</button>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Filters</h4>
        <div className="flex flex-col gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => onFilter(c)} className="text-left px-3 py-2 rounded hover:bg-slate-100">
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
