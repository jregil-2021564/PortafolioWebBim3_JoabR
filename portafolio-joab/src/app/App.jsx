import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../shared/components/Navbar'
import Footer from '../shared/components/Footer'
import HomePage from './HomePage'
import ProjectDetailPage from '../features/portfolio/pages/ProjectDetailPage'
import IntroScreen from '../features/intro/IntroScreen'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
  }, [entered])

  return (
    <div className="relative min-h-screen">
      {!entered && <IntroScreen onEnter={() => setEntered(true)} />}

      {entered && (
        <>
          <Navbar />
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <HomePage />
                  </PageTransition>
                }
              />
              <Route
                path="/proyecto/:id"
                element={
                  <PageTransition>
                    <ProjectDetailPage />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
          <Footer />
        </>
      )}
    </div>
  )
}
