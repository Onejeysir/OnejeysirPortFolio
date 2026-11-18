import { AppWindow, Braces, CodeXml, Layers3, Network, Sparkles } from 'lucide-react'
import { services } from '../data/portfolio'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const iconMap = { window: AppWindow, app: Layers3, frontend: CodeXml, backend: Braces, platforms: Network, solutions: Sparkles }

export function Services() {
  return (
    <section id="services" className="section section--services" aria-labelledby="services-title">
      <div className="page-shell">
        <SectionHeading number="04" eyebrow="What I Can Build" headingId="services-title" title={<>Une idée claire.<br /><span>Un chemin numérique.</span></>} note="Des domaines d’intervention en construction, abordés avec transparence sur mon niveau de formation." />
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <Reveal className="service-card" key={service.id} delay={index * 0.045}>
                <div className={`service-card__diagram service-card__diagram--${service.number}`} aria-hidden="true"><span /><span /><span /><Icon size={19} strokeWidth={1.35} /></div>
                <div className="service-card__copy"><span>{service.number} / 06</span><h3>{service.title}</h3><p>{service.text}</p></div>
                <div className="service-card__arrow" aria-hidden="true">↗</div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
