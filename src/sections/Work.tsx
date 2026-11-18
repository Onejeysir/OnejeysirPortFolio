import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import { Reveal } from '../components/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeading } from '../components/SectionHeading'

export function Work() {
  return (
    <section id="work" className="section section--work" aria-labelledby="work-title">
      <div className="page-shell">
        <SectionHeading number="03" eyebrow="Selected Works" headingId="work-title" title={<>Des projets,<br /><span>en mouvement.</span></>} note="Une sélection de réalisations et de concepts, avec leur niveau d’avancement explicité." />
        <div className="work-intro"><p>Les informations marquées « à confirmer » attendent la validation du statut réel et des liens de démonstration.</p><a href="#contact">Proposer une collaboration <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        <div className="project-list">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
        <Reveal className="work-note"><span className="work-note__index">NOTE / 01</span><p>Les visuels sont des illustrations originales ; aucune interface n’est présentée comme capture réelle. Les liens de démo et de dépôt seront ajoutés lorsqu’ils seront confirmés.</p></Reveal>
      </div>
    </section>
  )
}
