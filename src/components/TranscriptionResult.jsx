import React from 'react'
import { FiCopy } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function TranscriptionResult({ transcription, loading }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white">Transcription Result</h2>
        {transcription && (
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiCopy size={20} />
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
          <p className="text-gray-300 whitespace-pre-wrap">
            {transcription || 'No transcription yet'}
          </p>
        </div>
      )}
    </div>
  )
}
