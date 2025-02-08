import { Deepgram } from '@deepgram/sdk'

const DEEPGRAM_API_KEY = '06a73af75cba5c1f26ea8bcb66817f11761034f6'
const deepgram = new Deepgram(DEEPGRAM_API_KEY)

export async function transcribeAudio(file, settings) {
  const source = {
    buffer: await file.arrayBuffer(),
    mimetype: file.type,
  }

  const options = {
    punctuate: settings.punctuate,
    model: settings.model,
    language: settings.language,
    smart_format: settings.smartFormat,
    diarize: settings.diarize,
  }

  if (settings.customVocabulary.length > 0) {
    options.keywords = settings.customVocabulary
  }

  try {
    const response = await deepgram.transcription.preRecorded(source, options)
    return response.results?.channels[0]?.alternatives[0]?.transcript || ''
  } catch (error) {
    console.error('Deepgram API Error:', error)
    throw new Error('Failed to transcribe audio')
  }
}
