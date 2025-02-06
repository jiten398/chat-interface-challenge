import React, { useState } from 'react';
import { Message } from '../../types/chat';

interface Props {
  message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  // State to hold the status message for copy-to-clipboard functionality
  const [copyStatus, setCopyStatus] = useState<string>('');
/**
   * Copies provided text to the clipboard.
   * Provides feedback on success or failure.
   * @param text The text to copy.
   */
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('Copied!');
      // Reset the copy status after 2 seconds
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyStatus('Failed to copy');
    }
  };
  /**
     * Renders a code block with syntax highlighting.
     * Includes a button to copy the code.
     * @param code The code content.
     * @param language Optional language for syntax highlighting.
     */
  const renderCodeBlock = (code: string, language?: string) => (
    <div className="bg-gray-100 p-2 rounded-md my-2">
      <pre className="relative bg-black text-white p-3 rounded-lg overflow-auto">
        <code className={language ? `language-${language}` : ''}>
          {code.trim()}
        </code>
        <button
          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
          onClick={() => copyToClipboard(code.trim())}
          aria-label="Copy code to clipboard"
        >
          {copyStatus || 'Copy Code'}
        </button>
      </pre>
    </div>
  );
/**
   * Splits message content to render plain text and code blocks.
   * Uses regex to identify code blocks.
   * @param content The full message content.
   */
  const renderMessageContent = (content: string) => {
     // Split the content based on code block markers
    const parts = content.split(/(```[\s\S]*?```)/);
    
    return parts.map((part, index) => {
       // Check if the part is a code block
      const codeBlockMatch = part.match(/```(\w+)?\n?([\s\S]*?)```/);
      
      if (codeBlockMatch) {
        const [, language, code] = codeBlockMatch;
        return <React.Fragment key={index}>{renderCodeBlock(code, language)}</React.Fragment>;
      }
       // Render regular text content
      return part && <p key={index} className="text-sm whitespace-pre-wrap">{part}</p>;
    });
  };

  return (
    <div
      className={`p-3 my-1 max-w-xs md:max-w-sm rounded-lg ${
        message.type === 'user' 
          ? 'bg-blue-500 text-white self-end'
          : 'bg-gray-200 text-black self-start'
      }`}
      role="listitem"
    >
      <div className="break-words">
        {renderMessageContent(message.content)}
      </div>
       {/* Display message timestamp */}
      <div className="text-xs mt-1 text-right" 
           style={{ color: message.type === 'user' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}>
        {new Date(message.timestamp).toLocaleTimeString()}
        {/* Display message source for user messages */}
        {message.type === 'user' && (
        <div className="text-xs mt-1 text-right" 
             style={{ color: message.type === 'user' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}>
          {message.source === 'speech' ? 'Voice Message' : 'Text Message'}
        </div>
      )}
      </div>
    </div>
  );
};

export default MessageBubble;