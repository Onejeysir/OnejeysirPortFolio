import { ArrowUpRight, MoveUpRight } from 'lucide-react'
import { principles } from '../data/portfolio'
import { Reveal } from '../components/Reveal'

export function Vision() {
  return (
    <section id="vision" className="section section--vision" aria-labelledby="vision-title">
      <div className="page-shell vision-layout">
        <Reveal className="vision-stamp"><span>ONEJEYSIRDEV</span><strong>Useful<br />by design.</strong><div><i /><i /><i /><i /></div><small>VISION / 2026</small></Reveal>
        <div className="vision-copy">
          <p className="eyebrow"><span className="section-index">06</span> Vision &amp; objectifs</p>
          <Reveal><h2 id="vision-title">Construire des solutions numériques <em>utiles, performantes et accessibles.</em></h2></Reveal>
          <Reveal delay={0.08}><p className="vision-description">Je veux progresser en restant proche des besoins concrets : comprendre le problème, apprendre les bons outils et livrer une expérience claire.</p></Reveal>
          <div className="vision-principles">{principles.map((item, index) => <Reveal key={item} delay={index * 0.035} className="vision-principle"><span>0{index + 1}</span><p>{item}</p><MoveUpRight size={13} aria-hidden="true" /></Reveal>)}</div>
          <a className="text-link vision-link" href="#contact">Échanger sur une idée <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
