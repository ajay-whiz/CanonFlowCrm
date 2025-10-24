'use client'

import React, { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service or console for debugging
    // eslint-disable-next-line no-console
    console.error('Lead detail route error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold text-error-700 mb-2">Something went wrong while loading the lead.</h2>
        <p className="text-sm text-secondary-700 whitespace-pre-wrap mb-4">
          {error?.message || 'Unknown error'}{error?.digest ? `\nDigest: ${error.digest}` : ''}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700"
          >
            Try again
          </button>
          <button
            onClick={() => (window.location.href = '/leads')}
            className="px-4 py-2 rounded border border-secondary-300 text-secondary-800 hover:bg-secondary-50"
          >
            Back to Leads
          </button>
        </div>
      </div>
    </div>
  )
}
