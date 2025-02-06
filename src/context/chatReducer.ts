import { ChatState, Message } from '../types/chat';

export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_RECORDING'; payload: boolean }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error | undefined }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<ChatState['settings']> };
/**
 * Reducer function for handling chat-related actions.
 * Updates the chat state based on the dispatched action.
 * @param state The current chat state.
 * @param action The action to process.
 */
export const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_RECORDING':
      return { ...state, isRecording: action.payload };
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    default:
      return state;
  }
};
