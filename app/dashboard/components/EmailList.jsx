'use client'
import { useState } from 'react'
import EmailCard from './EmailCard'

export default function EmailList({ emails = [] }) {
  const [selectedEmail, setSelectedEmail] = useState(null)

  if (!emails || emails.length === 0)
    return (
      <div className="card">
        No emails fetched yet. Use <strong>Fetch last 15 emails</strong>.
      </div>
    )

  return (
    <div className="space-y-3">
      {/* Email List */}
      {emails.map((e) => (
        <div key={e.id} onClick={() => setSelectedEmail(e)} className="cursor-pointer">
          <EmailCard email={e} />
        </div>
      ))}

      {/* Popup / Modal for full email */}
      {selectedEmail && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedEmail(null)} // click background to close
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-3xl h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {selectedEmail.subject || '(No Subject)'}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              <strong>From:</strong> {selectedEmail.from}
            </p>

            {/* ✅ Show the full email body (HTML or text) */}
            {selectedEmail.body ? (
              <div
                className="prose max-w-none text-gray-800 border-t pt-3"
                dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
              />
            ) : (
              <p className="text-sm text-gray-700 italic mt-4">
                No body content available.
              </p>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center text-sm text-gray-500 mt-6">
              <span>
                <strong>Category:</strong> {selectedEmail.category || 'Unclassified'}
              </span>
              <button
                onClick={() => setSelectedEmail(null)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
