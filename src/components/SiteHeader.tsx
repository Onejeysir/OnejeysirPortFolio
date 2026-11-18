import { useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { BrandMark } from './BrandMark'

const links = [
  { href: '#about', label: 'À propos' },
  { href: '#stack', label: 'Technologies' },
  { href: '#work', label: 'Projets' },
  { href: '#process', label: 'Processus' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const close = () => setOpen(false)

  return (
    <>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <header className="site-header">
        <div className="site-header__inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Navigation principale">
            {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <a className="header-contact" href="#contact">Parlons d’un projet <ArrowUpRight size={14} aria-hidden="true" /></a>
          <button className="menu-toggle" type="button" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Navigation mobile" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
              {links.map((link, index) => (
                <a key={link.href} href={link.href} onClick={close}><span>0{index + 1}</span>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a>
              ))}
              <a className="mobile-nav__contact" href="#contact" onClick={close}>Me contacter <ArrowUpRight size={16} aria-hidden="true" /></a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
