import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Aperture, ScanFace } from 'lucide-react'
import { profile } from '../data/portfolio'
import { SceneBoundary } from '../scenes/SceneBoundary'

const HeroScene = lazy(() => import('../scenes/HeroScene'))

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

function SceneFallback() {
  return (
    <svg className="hero-art__fallback" viewBox="0 0 520 520" role="img" aria-label="Composition géométrique abstraite gris acier et orange">
      <circle cx="260" cy="260" r="164" fill="none" stroke="currentColor" strokeOpacity=".32" />
      <circle cx="260" cy="260" r="130" fill="none" stroke="currentColor" strokeOpacity=".55" strokeDasharray="2 8" />
      <path d="m260 85 151 87v174l-151 88-151-88V172l151-87Z" fill="#161715" stroke="#c4c1b6" strokeOpacity=".56" />
      <path d="m260 85 84 176h-84V85Zm0 176 151-89v174l-151 88V261Z" fill="#292b28" stroke="#d9d7cf" strokeOpacity=".48" />
      <path d="m260 261 84 0-84 176-84-48 84-128Z" fill="#ff6b35" fillOpacity=".78" />
      <circle cx="260" cy="260" r="11" fill="#ff6b35" />
      <path d="M31 260h76m306 0h76M260 31v54m0 350v54" stroke="#ff6b35" strokeOpacity=".72" />
    </svg>
  )
}

export function Hero() {
  const [webgl, setWebgl] = useState(false)
  const reduceMotion = useReducedMotion()
  useEffect(() => setWebgl(supportsWebGL()), [])

  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.p className="hero-kicker" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62, duration: 0.52}}>
            <span className="status-dot" /> Portfolio personnel <span className="hero-kicker__divider">/</span> Cameroun
          </motion.p>
          <motion.h1 id="hero-title" className="hero-wordmark" initial={reduceMotion ? false : { opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.74, ease: [0.22, 1, 0.36, 1] }}>
            ONEJEY<span>SIR</span><i>.</i>
          </motion.h1>
          <p className="hero-name">{profile.fullName}</p>
          <p className="hero-role">Creative Developer <span>/</span> Full-Stack Developer in Training</p>
          <p className="hero-statement">{profile.quote}</p>

          <div className="hero-actions">
            <a className="button button--solid" href="#work">Découvrir mes projets <ArrowDown size={15} aria-hidden="true" /></a>
            <a className="button button--line" href="#contact">Me contacter <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
          <div className="hero-bottom-row">
            <div className="photo-placeholder" aria-label="Emplacement réservé à la photo professionnelle de Jeyson">
              <div className="photo-placeholder__frame"><ScanFace size={27} strokeWidth={1.1} aria-hidden="true" /></div>
              <div><span>Portrait</span><small>Photo à ajouter</small></div>
              <span className="photo-placeholder__corner" aria-hidden="true">01</span>
            </div>
            <div className="hero-study"><span>En formation</span><strong>Génie logiciel</strong><small>ENSPD · Niveau 3</small></div>
          </div>
        </div>

        <div className="hero-art" aria-label="Scène 3D géométrique abstraite">
          <div className="hero-art__orbit hero-art__orbit--one" aria-hidden="true" />
          <div className="hero-art__orbit hero-art__orbit--two" aria-hidden="true" />
          <div className="hero-art__canvas">
            {webgl ? (
              <SceneBoundary fallback={<SceneFallback />}>
                <Suspense fallback={<SceneFallback />}><HeroScene /></Suspense>
              </SceneBoundary>
            ) : <SceneFallback />}
          </div>
          <div className="hero-art__label"><Aperture size={14} aria-hidden="true" /><span>FORME / 001</span></div>
          <p className="hero-art__coordinates">3D · WEB · INTERACTION<br />04°03′ N / 09°42′ E</p>
          <span className="hero-art__cross hero-art__cross--a" aria-hidden="true">+</span>
          <span className="hero-art__cross hero-art__cross--b" aria-hidden="true">+</span>
        </div>
      </div>
      <a className="hero-scroll" href="#about"><span>Faire défiler</span><span className="hero-scroll__line" aria-hidden="true" /></a>
      <div className="hero-side-note" aria-hidden="true">ONEJEYSIRDEV <span>—</span> 2026</div>
    </section>
  )
}
