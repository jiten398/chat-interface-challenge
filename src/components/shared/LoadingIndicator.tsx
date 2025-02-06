import React from 'react';

interface LoadingIndicatorProps {
  type?: 'app' | 'typing';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ type = 'app' }) => {
  if (type === 'typing') {
    return (
      <div className="flex items-center space-x-2 p-2">
        <div className="text-gray-500 text-sm"></div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" 
               style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" 
               style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" 
               style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    );
  }
 // Render a full-screen loading indicator for the app-level loading state
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-12 h-12">
        {/* Outer spinning circle */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-200" />
         {/* Spinning circle indicator */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>
      <div className="mt-2 text-gray-600 text-sm">Loading...</div>
    </div>
  );
};

export default LoadingIndicator;