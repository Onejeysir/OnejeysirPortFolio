import { ArrowUpRight } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { profile } from '../data/portfolio'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <div className="site-footer__brand"><BrandMark /><p>Apprendre en construisant.<br />Progresser avec intention.</p></div>
        <div className="site-footer__meta"><span>© {year} {profile.brand}</span><span>Portfolio personnel · Cameroun</span><span className="social-placeholder">GitHub &amp; LinkedIn · profils à renseigner</span></div>
        <a className="site-footer__top" href="#top">Retour en haut <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  )
}
