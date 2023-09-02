import { useTheme } from "@/app/context/ThemeContext";
import { useState } from "react";

export default function DarkMode() {
  const { theme, setTheme } = useTheme();
  const darkMode = theme === "dark";

  const handleToggleDarkMode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div
      className={`ml-4 h-[44px] w-fit cursor-pointer whitespace-nowrap rounded-lg bg-brown py-2 px-4 text-black
      dark:bg-sand`}
      onClick={() => handleToggleDarkMode()}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </div>
  );
}
