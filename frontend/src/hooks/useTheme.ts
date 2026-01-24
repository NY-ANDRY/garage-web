import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    // Récupère le thème depuis localStorage ou utilise "dark" par défaut
    const savedTheme = localStorage.getItem("theme")
    return savedTheme === "light" ? "light" : "dark"
  })

  useEffect(() => {
    // Applique le thème courant au body
    document.body.classList.remove("light", "dark")
    document.body.classList.add(theme)
    // Sauvegarde le thème dans localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  return { theme, toggleTheme }
}
