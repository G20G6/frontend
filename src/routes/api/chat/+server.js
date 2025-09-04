import { GoogleGenerativeAI } from "@google/generative-ai";
import {GEMINI_API_KEY, GOOGLE_AI_MODEL} from '$env/static/private';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST({ request }) {
    const { prompt } = await request.json();

    try {
        const model = genAI.getGenerativeModel({ model: GOOGLE_AI_MODEL });

        // TODO: Add RAG logic here
        
        const result = await model.generateContent(prompt);
        const response = result.response.text()

        return new Response(JSON.stringify({ response }), { status: 200 });
    } catch (error) {
        console.error('Error generating text:', error);
        return new Response(JSON.stringify({ error: 'Error generating text' }), { status: 500 });
    }
}