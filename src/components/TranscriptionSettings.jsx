import React from 'react'

export default function TranscriptionSettings({ settings, onSettingsChange }) {
  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl text-white mb-4">Transcription Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Language</label>
          <select
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Model</label>
          <select
            value={settings.model}
            onChange={(e) => handleChange('model', e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          >
            <option value="base">Base</option>
            <option value="enhanced">Enhanced</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.punctuate}
            onChange={(e) => handleChange('punctuate', e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-300">Enable punctuation</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.smartFormat}
            onChange={(e) => handleChange('smartFormat', e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-300">Smart formatting</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.diarize}
            onChange={(e) => handleChange('diarize', e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-300">Speaker diarization</label>
        </div>
      </div>
    </div>
  )
}
