import express from 'express';
import multer from 'multer';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const DEEPGRAM_API_KEY = 'YOUR_API_KEY';

app.use(express.json());
app.use(express.static('dist'));

app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file provided' });
  }

  const settings = JSON.parse(req.body.settings);

  try {
    const response = await fetch('https://api.deepgram.com/v1/listen', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${DEEPGRAM_API_KEY}`,
        'Content-Type': req.file.mimetype,
      },
      body: req.file.buffer,
      query: {
        punctuate: settings.punctuate,
        model: settings.model,
        language: settings.language,
        smart_format: settings.smartFormat,
        diarize: settings.diarize,
      }
    });

    const data = await response.json();
    res.json({ transcript: data.results?.channels[0]?.alternatives[0]?.transcript || '' });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
