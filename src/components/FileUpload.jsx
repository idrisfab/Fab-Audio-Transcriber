import React, { useRef } from 'react'
import { FiUpload } from 'react-icons/fi'
import toast from 'react-hot-toast'

const ALLOWED_TYPES = ['audio/mp3', 'audio/wav', 'audio/x-m4a']
const MAX_SIZE = 100 * 1024 * 1024 // 100MB

export default function FileUpload({ onFileSelect, onTranscribe, loading }) {
  const fileInput = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Please upload MP3, WAV, or M4A files only')
      return
    }

    if (file.size > MAX_SIZE) {
      toast.error('File size must be less than 100MB')
      return
    }

    onFileSelect(file)
    toast.success('File selected successfully')
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div 
        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
        onClick={() => fileInput.current?.click()}
      >
        <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
        <p className="text-gray-300 mb-2">
          Drop your audio file here or click to browse
        </p>
        <p className="text-gray-500 text-sm">
          Supports MP3, WAV, M4A (max 100MB)
        </p>
        <input
          ref={fileInput}
          type="file"
          className="hidden"
          accept=".mp3,.wav,.m4a"
          onChange={handleFileChange}
        />
      </div>

      <button
        onClick={onTranscribe}
        disabled={loading}
        className="w-full mt-4 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Transcribing...' : 'Start Transcription'}
      </button>
    </div>
  )
}
