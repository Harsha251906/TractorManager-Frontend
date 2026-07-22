import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
  };

  return (
    <select value={i18n.language} onChange={changeLanguage}>
      <option value="en">🇬🇧 English</option>
      <option value="ta">🇮🇳 தமிழ்</option>
      <option value="te">🇮🇳 తెలుగు</option>
      <option value="hi">🇮🇳 हिन्दी</option>
    </select>
  );
}

export default LanguageSwitcher;