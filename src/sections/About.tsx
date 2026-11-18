import { ArrowDownRight, GraduationCap } from 'lucide-react'
import { education, profile } from '../data/portfolio'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

export function About() {
  return (
    <section id="about" className="section section--about" aria-labelledby="about-title">
      <div className="page-shell">
        <SectionHeading number="01" eyebrow="Derrière le code" headingId="about-title" title={<>Derrière le code,<br /><span>une vision.</span></>} note="Un parcours qui avance par la curiosité, la pratique et l’envie de comprendre." />
        <div className="about-layout">
          <Reveal className="about-narrative">
            <p className="about-lead">Je suis <strong>Fokou Jeyson Udalric</strong>, étudiant en génie logiciel et développeur en formation.</p>
            <p>Mon parcours se construit entre apprentissages académiques et projets numériques. Je m’intéresse au développement web, aux technologies modernes et à la façon dont une application peut rendre un service réellement utile.</p>
            <p>Applications web, architecture Full-Stack et expériences interactives sont des terrains que j’explore pas à pas. Ici, je documente honnêtement ce que j’apprends et ce que je construis.</p>
            <a className="text-link" href="#work">Voir les projets <ArrowDownRight size={16} aria-hidden="true" /></a>
          </Reveal>
          <Reveal className="education-panel" delay={0.12}>
            <div className="education-panel__head"><GraduationCap size={18} aria-hidden="true" /><span>Parcours académique</span><span className="education-panel__line" /></div>
            <div className="education-timeline">
              {education.map((item) => (
                <article className={`education-item${item.current ? ' education-item--current' : ''}`} key={item.id}>
                  <span className="education-item__node" aria-hidden="true" />
                  <div className="education-item__number">{item.step}</div>
                  <div className="education-item__text"><h3>{item.title}</h3><p>{item.subtitle}</p><small>{item.note}</small></div>
                  {item.current && <span className="education-item__now">EN COURS</span>}
                </article>
              ))}
            </div>
            <div className="education-panel__quote"><span>“</span><p>Apprendre en construisant.<br />Progresser avec intention.</p><span className="education-panel__signature">{profile.brand}</span></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
