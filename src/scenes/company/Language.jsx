import React from "react";
import { useLanguage } from "../LanguageContext";
const Language = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <label>
        Language:
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
      </label>
    </div>
  );
};

export default Language;
