import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const LanguageSelector: React.FC = () => {
  const { state, dispatch } = useContext(ChatContext);
  /**
     * Handles the change of language.
     * Dispatches an action to update the language in the chat settings.
     * @param e React change event for the select element.
     */
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { language: e.target.value } });
  };

  return (
    <div>
      <label className="mr-2">Language:</label>
      <select
        value={state.settings.language}
        onChange={handleLanguageChange}
        className="p-2 text-black border rounded"
      >
        <option value="en">English</option>
        <option value="es">Hindi</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
