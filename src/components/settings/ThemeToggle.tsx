import React, { useContext, useEffect } from 'react';
import { ChatContext } from '../../context/ChatContext';

const ThemeToggle: React.FC = () => {
  const { state, dispatch } = useContext(ChatContext);
 /**
   * Toggles the theme between 'light' and 'dark'.
   * Dispatches an action to update the theme in the chat settings.
   */
  const toggleTheme = () => {
    const newTheme = state.settings.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'UPDATE_SETTINGS', payload: { theme: newTheme } });
  };
// Apply the theme to the document body based on the current setting
  useEffect(() => {
    document.body.classList.toggle('dark-mode', state.settings.theme === 'dark');
  }, [state.settings.theme]);

  return (
    <div className="mb-4">
      <button onClick={toggleTheme} className="p-2 bg-black rounded">
        Toggle Theme (Current: {state.settings.theme})
      </button>
    </div>
  );
};

export default ThemeToggle;
