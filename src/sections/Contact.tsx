import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Mail, MessageCircle, Send } from 'lucide-react'
import { profile } from '../data/portfolio'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

type SubmitState = { kind: 'idle' | 'sending' | 'success' | 'error'; message: string }
type ApiResponse = { success?: boolean; message?: string; error?: string }

export function Contact() {
  const [status, setStatus] = useState<SubmitState>({ kind: 'idle', message: '' })
  const whatsappUrl = `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent('Bonjour Jeyson, je souhaite échanger au sujet d’un projet.')}`

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setStatus({ kind: 'sending', message: 'Transmission en cours…' })
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json() as ApiResponse
      if (!response.ok || !result.success) throw new Error(result.message || 'Le message n’a pas pu être transmis. Réessayez ou utilisez WhatsApp.')
      form.reset()
      setStatus({ kind: 'success', message: result.message || 'Votre message a bien été transmis.' })
    } catch (error) {
      setStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Une erreur est survenue. Utilisez WhatsApp ou le lien email direct.' })
    }
  }

  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="page-shell">
        <SectionHeading number="07" eyebrow="Let's Build Something Great" headingId="contact-title" title={<>Votre prochaine<br /><span>bonne idée.</span></>} note="Parlons du besoin, des contraintes et de la première étape." light />
        <div className="contact-layout">
          <Reveal className="contact-details">
            <p className="contact-details__intro">Pour une collaboration, une question ou un échange autour d’un projet, choisissez le canal qui vous convient.</p>
            <a className="contact-method" href={`mailto:${profile.email}`}><span className="contact-method__icon"><Mail size={18} /></span><span><small>EMAIL</small><strong>{profile.email}</strong></span><ArrowUpRight size={17} /></a>
            <a className="contact-method" href={whatsappUrl} target="_blank" rel="noreferrer"><span className="contact-method__icon"><MessageCircle size={18} /></span><span><small>WHATSAPP</small><strong>{profile.whatsappDisplay}</strong></span><ArrowUpRight size={17} /></a>
            <div className="contact-brand"><span>BRAND / 01</span><strong>{profile.brand}</strong><small>Douala · Cameroun</small></div>
          </Reveal>
          <Reveal className="contact-form-wrap" delay={0.12}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__heading"><span>01 — 04 / MESSAGE</span><Send size={15} aria-hidden="true" /></div>
              <div className="form-row">
                <label>Votre nom<input name="name" type="text" autoComplete="name" minLength={2} maxLength={100} placeholder="Nom et prénom" required /></label>
                <label>Votre email<input name="email" type="email" autoComplete="email" maxLength={254} placeholder="vous@exemple.com" required /></label>
              </div>
              <label>Objet<input name="subject" type="text" minLength={3} maxLength={160} placeholder="Le sujet de votre message" required /></label>
              <label>Message<textarea name="message" minLength={10} maxLength={5000} rows={5} placeholder="Décrivez brièvement votre idée ou votre besoin…" required /></label>
              <div className="form-honeypot" aria-hidden="true"><label>Ne pas remplir<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <div className="contact-form__bottom"><p>Vos coordonnées servent uniquement à répondre à ce message.</p><button className="button button--orange" type="submit" disabled={status.kind === 'sending'}>{status.kind === 'sending' ? 'Envoi…' : 'Envoyer le message'}{status.kind === 'success' ? <Check size={16} /> : <ArrowUpRight size={16} />}</button></div>
              <p className={`form-status form-status--${status.kind}`} role={status.kind === 'error' ? 'alert' : 'status'} aria-live="polite">{status.message || ' '}</p>
            </form>
            <p className="contact-fallback">Le formulaire utilise un serveur email réel. Si SMTP n’est pas configuré, le site l’indiquera sans simuler l’envoi. <a href={whatsappUrl} target="_blank" rel="noreferrer">Continuer sur WhatsApp <ArrowUpRight size={12} /></a></p>
          </Reveal>
        </div>
        <div className="contact-endline"><span>UN PROJET EN TÊTE ?</span><a href={whatsappUrl} target="_blank" rel="noreferrer">Démarrer la conversation <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}
