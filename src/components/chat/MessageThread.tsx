import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import MessageBubble from './MessageBubble';
import LoadingIndicator from '../shared/LoadingIndicator';

const MessageThread = () => {
    // Retrieve chat state from context
  const { state } = useContext(ChatContext);
  
  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
       {/* Map through messages and render each one as a MessageBubble */}
      {state.messages.map(message => (
        <MessageBubble key={message.id} message={message} />
      ))}
       {/* Show loading indicator if messages are being processed */}
      {state.isProcessing && <LoadingIndicator type="typing" />}
    </div>
  );
};

export default MessageThread;
