import { ArrowUpRight, Braces, Database, GitBranch, PanelsTopLeft } from 'lucide-react'
import { skillGroups } from '../data/portfolio'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const symbols = [PanelsTopLeft, Database, Braces, GitBranch]

export function Stack() {
  return (
    <section id="stack" className="section section--stack" aria-labelledby="stack-title">
      <div className="page-shell">
        <SectionHeading number="02" eyebrow="Technologies & Engineering" headingId="stack-title" title={<>Les outils derrière<br /><span>les idées.</span></>} note="Un socle en progression, organisé par domaines plutôt qu’en scores de maîtrise." />
        <div className="stack-intro"><p>Chaque outil correspond à une pratique ou à un apprentissage en cours.</p><span>Pas de jauges. Pas de raccourcis.</span></div>
        <div className="stack-grid">
          {skillGroups.map((group, index) => {
            const Icon = symbols[index]
            return (
              <Reveal key={group.id} delay={index * 0.07} className={`stack-card stack-card--${group.id}`}>
                <div className="stack-card__top"><span className="stack-card__number">{group.number} / 04</span><Icon size={19} strokeWidth={1.5} aria-hidden="true" /><ArrowUpRight className="stack-card__arrow" size={15} aria-hidden="true" /></div>
                <h3>{group.title}</h3>
                <p>{group.note}</p>
                <div className="stack-tags">{group.skills.map((skill) => <span className={skill.includes('apprentissage') ? 'is-learning' : ''} key={skill}>{skill}{skill.includes('apprentissage') && <i>APPRENTISSAGE</i>}</span>)}</div>
                <div className="stack-card__rule" aria-hidden="true" />
              </Reveal>
            )
          })}
        </div>
        <p className="stack-footnote"><span className="status-dot" /> Laravel &amp; Node.js : technologies en apprentissage.</p>
      </div>
    </section>
  )
}
