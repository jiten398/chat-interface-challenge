import React from 'react';
import ChatContainer from './components/chat/ChatContainer';
import { ChatProvider } from './context/ChatContext';
import ErrorBoundary from './components/shared/ErrorBoundary';
import './App.css'; 

const App: React.FC = () => {
  return (
      <ChatProvider>
        <ErrorBoundary>
          <div className="App flex flex-col bg-gray-50 dark:bg-gray-900">
            <ChatContainer />
          </div>
        </ErrorBoundary>
      </ChatProvider>
  );
};

export default App;
