export interface QuizOption {
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  detailedInfo: string;
  icon: string;
  quiz?: {
    question: string;
    options: QuizOption[];
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}