import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BrandMark } from './BrandMark'

export function IntroLoader() {
  const [visible, setVisible] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false)
      return
    }
    const timer = window.setTimeout(() => setVisible(false), 720)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  if (!visible || reduceMotion) return null
  return (
    <motion.div className="intro-loader" aria-hidden="true" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <BrandMark compact />
      <div className="intro-loader__line"><span /></div>
      <span className="intro-loader__label">ONEJEYSIRDEV · PORTFOLIO</span>
    </motion.div>
  )
}
