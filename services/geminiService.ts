import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = `
Du er en venlig og tålmodig teknisk support-assistent fra Google. 
Din opgave er at hjælpe brugere, der installerer deres Google Home Mini eller Nest Mini for første gang.
Du skal altid svare på dansk.
Vær kortfattet og præcis. Brug letforståeligt sprog.
Hvis brugeren sidder fast, tilbyd konkrete fejlfindingstrin (f.eks. "Tjek om Bluetooth er tændt", "Prøv at genstarte enheden").
Du kender til installationsprocessen: Udpakning, Strøm, App-installation, Wi-Fi opsætning.
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