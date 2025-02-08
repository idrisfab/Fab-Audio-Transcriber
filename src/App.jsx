import React, { useState } from 'react'
import FileUpload from './components/FileUpload'
import TranscriptionSettings from './components/TranscriptionSettings'
import TranscriptionResult from './components/TranscriptionResult'
import { transcribeAudio } from './services/api'
import toast from 'react-hot-toast'

export default function App() {
  const [file, setFile] = useState(null)
  const [settings, setSettings] = useState({
    language: 'en',
    model: 'base',
    punctuate: true,
    smartFormat: true,
    diarize: false,
    customVocabulary: []
  })
  const [transcription, setTranscription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTranscribe = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }
    
    setLoading(true);
    try {
      const result = await transcribeAudio(file, settings);
      setTranscription(result);
      toast.success('Transcription completed');
    } catch (error) {
      console.error('Transcription error:', error);
      toast.error('Failed to transcribe audio');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Audio Transcription
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <FileUpload 
            onFileSelect={setFile} 
            onTranscribe={handleTranscribe}
            loading={loading}
          />
          <TranscriptionSettings 
            settings={settings}
            onSettingsChange={setSettings}
          />
        </div>
        
        <TranscriptionResult 
          transcription={transcription}
          loading={loading}
        />
      </div>
    </div>
  )
}
