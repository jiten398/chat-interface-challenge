export interface Message {
    id: string;
    content: string;
    timestamp: Date;
    type: "user" | "ai" | "system";
    source?: "text" | "speech";
  }
  
  export interface ChatState {
    messages: Message[];
    isRecording: boolean;
    isProcessing: boolean;
    settings: {
      theme: "light" | "dark";
      language: string;
      speechEnabled: boolean;
    };
    error?: Error;
  }
  