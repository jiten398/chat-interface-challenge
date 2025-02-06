import {useState} from 'react';
import MessageThread from './MessageThread';
import InputArea from './InputArea';
import { FiMessageSquare, FiSettings } from "react-icons/fi";
import '../settings/SettingsPanel'
import SettingsPanel from '../settings/SettingsPanel';
const ChatContainer = () => {
  const [showSettings, setShowSettings] = useState(false);  // State to manage whether the settings panel popup is shown
  return (
    <div className="flex flex-col h-screen w-screen border rounded-lg shadow-md bg-white">
       {/* Header with icon and title */}
      <div className="p-4 text-white flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="p-4 bg-blue-500 rounded-lg text-white"><FiMessageSquare /></span>
          <div className="flex flex-col text-black">
            <span className="text-lg font-semibold">AI Chat Assistant</span>
            <span className="text-sm">Speech recognition enabled</span>
          </div>
        </div>
         {/* Open settings panel on click */}
        <span onClick={() => setShowSettings(true)} className="p-4 text-black rounded-lg"><FiSettings /></span>
      </div>
       {/* Main chat message thread */}
      <MessageThread />
      {/* Input area for text and speech */}
      <InputArea />
       {/* Conditionally render the settings panel */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default ChatContainer;