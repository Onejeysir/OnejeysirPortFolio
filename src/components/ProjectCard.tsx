import { ArrowDownRight, ArrowUpRight, Boxes, Code2, Globe2, Layers3, MessageCircle, MoveUpRight } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { profile } from '../data/portfolio'
import { Reveal } from './Reveal'

const visualMarks = {
  pixel: <><rect x="44" y="38" width="78" height="78" rx="2" /><path d="M73 38v28h28v28H73v22M122 59h27v27h-27M44 88H20v28h24M137 38h15M43 133h103" /><circle cx="83" cy="79" r="7" /><path d="m65 149 14-16 14 16m20-87 14-16 14 16" /></>,
  tech: <><circle cx="94" cy="76" r="28" /><circle cx="94" cy="76" r="9" /><circle cx="48" cy="118" r="10" /><circle cx="142" cy="119" r="10" /><circle cx="94" cy="142" r="8" /><path d="m73 94-18 17m60-17 19 17M94 104v29M47 48h22M121 48h22M39 66v25m110-25v25" /></>,
  transit: <><path d="M39 45h70l28 25v47H39z" /><path d="M109 45v27h28M51 87h30m-30 13h46m-46 13h22" /><circle cx="58" cy="124" r="8" /><circle cx="117" cy="124" r="8" /><path d="M151 49h20m-20 12h13M46 36h20" /></>,
  portfolio: <><path d="m94 27 55 31v63l-55 32-55-32V58l55-31Z" /><path d="m94 27 31 63H94V27Zm0 63 55-32v63l-55 32V90Z" /><path d="m94 90 31 0-31 63-31-18 31-45Z" /><circle cx="94" cy="90" r="5" /></>,
}

const statusClass = { confirm: 'status--confirm', concept: 'status--concept', building: 'status--building' }
const iconFor = { pixel: Boxes, tech: MessageCircle, transit: Globe2, portfolio: Layers3 }

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = iconFor[project.visual]
  const messageUrl = `mailto:${profile.email}?subject=${encodeURIComponent(`À propos de ${project.name}`)}`
  return (
    <Reveal className={`project-card project-card--${project.visual}`} delay={(index % 2) * 0.08}>
      <figure className={`project-visual project-visual--${project.visual}`}>
        <div className="project-visual__top"><span>CASE / {project.number}</span><Icon size={17} strokeWidth={1.4} aria-hidden="true" /></div>
        <svg className="project-visual__graphic" viewBox="0 0 188 180" role="img" aria-label={`Illustration abstraite du projet ${project.name}`}>
          <g fill="none" stroke="currentColor" strokeWidth="1.15">{visualMarks[project.visual]}</g>
          <circle cx="161" cy="40" r="2.5" fill="#ff6b35" />
        </svg>
        <div className="project-visual__title"><span>{project.category}</span><strong>{project.name}</strong></div>
        <figcaption>Illustration originale · pas une capture du produit</figcaption>
      </figure>
      <div className="project-card__body">
        <div className="project-card__meta"><span>{project.number} — {project.category}</span><span className={`project-status ${statusClass[project.status]}`}><i aria-hidden="true" />{project.statusLabel}</span></div>
        <h3>{project.name}</h3>
        <p className="project-card__description">{project.introduction}</p>
        <div className="project-facts">
          <div><span className="project-facts__label"><MoveUpRight size={12} /> ENJEU DÉCRIT</span><p>{project.challenge}</p></div>
          <div><span className="project-facts__label"><Code2 size={12} /> PÉRIMÈTRE COMMUNIQUÉ</span><p>{project.scope.join(' · ')}</p></div>
          {project.technologies.length > 0 && <div><span className="project-facts__label"><ArrowDownRight size={12} /> TECHNOLOGIES</span><div className="project-tech">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div>}
          <div className="project-card__role"><span>RÔLE</span><p>{project.role}</p></div>
        </div>
        <a className="project-link" href={messageUrl}>Écrire à propos du projet <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
    </Reveal>
  )
}
