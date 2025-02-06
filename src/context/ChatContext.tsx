import React, { createContext, useReducer, FC, ReactNode } from 'react';
import { ChatState } from '../types/chat';
import { chatReducer } from './chatReducer';
// Define the initial state for the chat
interface ChatProviderProps {
  children: ReactNode;
}

const initialState: ChatState = {
  messages: [],
  isRecording: false,
  isProcessing: false,
  settings: {
    theme: "light",
    language: "en",
    speechEnabled: true,
  },
  error: undefined,
};
// Create the ChatContext with an initial dummy dispatch function
export const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
/**
 * Provides the ChatContext to its children.
 * Wraps the application to share state and dispatch actions.
 */
export const ChatProvider: FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
