import type { ReactNode } from 'react'

type SectionHeadingProps = {
  number: string
  eyebrow: string
  title: ReactNode
  headingId?: string
  note?: string
  light?: boolean
}

export function SectionHeading({ number, eyebrow, title, headingId, note, light = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading${light ? ' section-heading--light' : ''}`}>
      <div className="section-heading__meta">
        <span className="section-index">{number}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className="section-heading__body">
        <h2 id={headingId}>{title}</h2>
        {note && <p>{note}</p>}
      </div>
    </div>
  )
}
