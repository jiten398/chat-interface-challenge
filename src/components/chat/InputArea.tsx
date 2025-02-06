import React, { useState, useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../types/chat';
import { sendMessageToApi } from '../../services/api';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';
import { FaMicrophone, FaPaperPlane } from 'react-icons/fa';

const InputArea: React.FC = () => {
  const [text, setText] = useState(''); // State to hold current input text
  const [inputSource, setInputSource] = useState<"text" | "speech">("text");
  const { dispatch } = useContext(ChatContext);
  // Predefined suggestions for quick replies currently hard coded it can be dynamic
  const suggestions = [
    "Tell me about hooks",
    "Performance tips",
    "State management"
  ];
  /**
     * Handles sending the message to the chat.
     * - Validates non-empty input.
     * - Dispatches user message and updates processing state.
     * - Sends the message to the API and dispatches AI response.
     */
  const handleSend = async () => {
    if (!text.trim()) return;
     // Create a new message object for the user input
    const message: Message = {
      id: uuidv4(),
      content: text,
      timestamp: new Date(),
      type: 'user',
      source: inputSource
    };
    
    // Add the user's message to the chat context
    dispatch({ type: 'ADD_MESSAGE', payload: message });
    // Indicate that processing (API call) is in progress
    dispatch({ type: 'SET_PROCESSING', payload: true });
     // Clear the text input
    setText('');
    setInputSource("text");

    try {
      // Call the API to get a response from the AI
      const response = await sendMessageToApi({ content: message.content, source: message.source! });
      const aiMessage: Message = {
        id: response.id,
        content: response.content,
        timestamp: new Date(response.timestamp),
        type: 'ai'
      };
      // Add the AI's response message to the chat context
      dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });
    } catch (error) {
       // Dispatch any errors encountered during the API call
      dispatch({ type: 'SET_ERROR', payload: error as Error });
    }
    // Update processing state to false when done
    dispatch({ type: 'SET_PROCESSING', payload: false });
  };
   /**
   * Handles quick reply suggestion clicks.
   * - Sets the text input to the suggestion.
   * - Immediately sends the message.
   */
  const handleSuggestionClick = (suggestion: string) => {
    setText(suggestion);
    handleSend();
  };
  // Custom hook for managing speech recognition functionality
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition((result: string) => {
    setText(result);
    setInputSource("speech");
  });

  return (
    <div className="p-4 border-t flex flex-col items-center bg-white">
      {/* Render quick reply suggestion buttons */}
      <div className="px-4 self-start py-3 grid grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="p-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 truncate text-left"
          >
            {suggestion}
          </button>
        ))}
      </div>
       {/* Input area for text messages and speech controls */}
      <div className="flex items-center gap-2 w-full">
        <input
          type="text"
          value={text}
          onChange={(e) => {setText(e.target.value);
            setInputSource("text");
          }}
          className="text-black border rounded p-2 w-full"
          placeholder="Type your message..."
        />
         {/* Microphone button to toggle speech recording */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`
            relative p-3 rounded-full transition-all duration-200
            ${isRecording 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          `}
          aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
          <FaMicrophone className="text-lg" />
          {isRecording && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-75 scale-50 animate-ping" />
          </div>
          )}
        </button>
        {/* Button to send the current message */}
        <button onClick={handleSend} className="p-4 bg-blue-500 text-white rounded-full">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default InputArea;