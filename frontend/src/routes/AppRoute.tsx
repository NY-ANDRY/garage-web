import React from "react"
import { useRoutes, useLocation } from "react-router-dom"
import { routes } from "./routes"
import { AnimatePresence } from "motion/react"

export default function AppRoute() {
  const element = useRoutes(routes)
  const location = useLocation()
  
  if (!element) return null

  // Differentiate between auth and the rest of backoffice to allow transitions
  const parts = location.pathname.split('/').filter(Boolean)
  const topLevelKey = parts[0] === 'backoffice' && parts[1] === 'auth' 
    ? 'backoffice-auth' 
    : parts[0] || 'root'

  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(element, { key: topLevelKey })}
    </AnimatePresence>
  )
}
