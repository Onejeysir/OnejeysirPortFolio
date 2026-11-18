import { ArrowRight } from 'lucide-react'
import { workSteps } from '../data/portfolio'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

export function Process() {
  return (
    <section id="process" className="section section--process" aria-labelledby="process-title">
      <div className="page-shell">
        <SectionHeading number="05" eyebrow="From Idea to Reality" headingId="process-title" title={<>Du besoin<br /><span>à la mise en ligne.</span></>} note="Un fil de travail pour garder le cap et clarifier chaque transition." />
        <div className="process-track">
          <div className="process-track__rule" aria-hidden="true" />
          {workSteps.map((step, index) => (
            <Reveal className="process-step" key={step.number} delay={index * 0.055}>
              <span className="process-step__node" aria-hidden="true" />
              <div className="process-step__index">{step.number}<span>{index === 0 ? 'START' : index === workSteps.length - 1 ? 'SHIP' : 'STEP'}</span></div>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
              {index < workSteps.length - 1 && <ArrowRight className="process-step__arrow" size={15} aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
        <p className="process-footnote"><span className="process-footnote__dot" /> Chaque étape s’adapte au contexte et au périmètre réel du projet.</p>
      </div>
    </section>
  )
}
