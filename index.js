const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/translate', async (req, res) => {
    try {
        const { text } = req.body;

        const prompt = `
        If the given text is in Garo language, translate it into English.
        If the given text is in English, translate it into Garo.

        Text: ${text}
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        res.json({
            message: response.text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error fetching data'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});