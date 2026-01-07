import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 dark:from-purple-600 dark:to-blue-600 p-[2px] shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Toggle theme"
    >
      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{ rotate: theme === "dark" ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {theme === "dark" ? (
            <Moon className="w-6 h-6 text-blue-400" fill="currentColor" />
          ) : (
            <Sun className="w-6 h-6 text-yellow-500" />
          )}
        </motion.div>
      </div>
    </motion.button>
  );
}
