import React from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-60">
      <div className="bg-blue-500 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
          {/* Theme toggling component */}
        <ThemeToggle />
         {/* Language selection component */}
        <LanguageSelector />
         {/* Button to close the settings panel */}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default Settings;