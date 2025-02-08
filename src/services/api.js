export async function transcribeAudio(file, settings) {
  const formData = new FormData();
  formData.append('audio', file);
  formData.append('settings', JSON.stringify(settings));

  try {
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Transcription failed');
    }

    const data = await response.json();
    return data.transcript;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to transcribe audio');
  }
}
