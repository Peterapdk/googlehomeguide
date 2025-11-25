import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = `
Du er en venlig og tålmodig Google Home ekspert.
Din opgave er at hjælpe brugere på dansk med to hovedområder:

1. INSTALLATION: Hjælp med at pakke ud, tilslutte strøm, hente appen og forbinde til Wi-Fi. Fejlfinding hvis noget går galt.
2. TIPS & TRICKS: Lær brugeren hvordan de bruger enheden. Fortæl om stemmekommandoer, musik, radio, rutiner, smart home styring (f.eks. lys), og sjove funktioner.

Vær altid opmuntrende. Brug letforståeligt sprog uden for meget teknisk jargon.
Hvis brugeren spørger om noget du ikke ved, så foreslå at kigge i Google Home appen.
Svar altid på dansk.
`;

export const initializeChat = () => {
  if (!process.env.API_KEY) {
    console.warn("API Key is missing for Gemini.");
    return;
  }
  
  try {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = genAI.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // Attempt re-init if session is lost/null
    initializeChat();
    if (!chatSession) {
      return "Beklager, jeg kan ikke forbinde til AI-tjenesten lige nu. Tjek venligst din internetforbindelse eller API-nøgle.";
    }
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Jeg kunne ikke generere et svar lige nu.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Der opstod en fejl under kommunikationen med assistenten. Prøv igen senere.";
  }
};