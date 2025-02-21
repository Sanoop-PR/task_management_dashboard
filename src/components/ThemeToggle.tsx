import { useThemeProvider } from "../utils/ThemeContext";
import { PiSunBold, PiMoonBold } from "react-icons/pi";

export default function ThemeToggle() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  const toggleTheme = () => {
    changeCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        checked={currentTheme === "light"}
        onChange={toggleTheme}
        aria-checked={currentTheme === "light"}
      />
      <label
        className="flex items-center justify-center cursor-pointer w-8 h-8 rounded-full"
        htmlFor="light-switch"
      >
        {currentTheme === "light" ? (
          <PiSunBold className="text-black" />
        ) : (
          <PiMoonBold className="text-white" />
        )}
      </label>
    </div>
  );
}
