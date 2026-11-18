type BrandMarkProps = { compact?: boolean }

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <a className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} href="#top" aria-label="ONEJEYSIRDEV, retour en haut">
      <svg className="brand-mark__symbol" viewBox="0 0 42 42" aria-hidden="true">
        <path d="M7 8h14v6h-8v14h8v6H7V8Z" />
        <path d="M35 8v26h-6L17 18v16h-6V8h6l12 16V8h6Z" />
        <path className="brand-mark__accent" d="M35 8v6h-6V8h6Z" />
      </svg>
      {!compact && <span className="brand-mark__word">ONEJEYSIR<span>DEV</span></span>}
    </a>
  )
}
