import type { SocialLink, Testimonial } from '../data/siteContent'

type ProfileHeaderProps = {
  socialLinks: SocialLink[]
}

export function ProfileHeader({ socialLinks }: ProfileHeaderProps) {
  return (
    <header className="profile">
      <div className="avatar">
        <img className="avatarLogo" src="/logo.png" alt="Logo de Andrea Arias" />
      </div>

      <h1>Andrea Arias</h1>
      <p className="role">Psicóloga Clínica - Modalidad Online y Presencial</p>

      <p className="bio">
        Bienvenido/a: Te ofrezco un espacio seguro y confidencial para trabajar tus emociones con un enfoque integral
        y principalmente basado en Terapia Cognitivo-Conductual (TCC), adaptado a niños, jóvenes y adultos.
      </p>

      <nav className="social">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            className="social__icon"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
          >
            <img src={item.icon} alt="" aria-hidden="true" />
          </a>
        ))}
      </nav>
    </header>
  )
}

type HomeActionsProps = {
  calendlyUrl: string
}

export function HomeActions({ calendlyUrl }: HomeActionsProps) {
  return (
    <section className="homeActions">
      <a className="linkBtn primary" href={calendlyUrl} target="_blank" rel="noopener noreferrer">
        <span className="emoji">📅</span>
        <span>Agendar consulta</span>
      </a>
    </section>
  )
}

type TestimonialsSectionProps = {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonios" className="section">
      <h2>💬 Testimonios</h2>

      <div className="testimonials">
        {testimonials.map((item) => (
          <article key={item.author} className="card testimonial">
            <p className="testimonial__quote">{item.quote}</p>
            <p className="testimonial__author">{item.author}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

type ContactSectionProps = {
  calendlyUrl: string
}

export function ContactSection({ calendlyUrl }: ContactSectionProps) {
  return (
    <section id="contacto" className="section">
      <h2>📩 Contacto directo</h2>

      <div className="grid">
        <div className="card">
          <h3>WhatsApp</h3>
          <p className="muted">Contáctame por WhatsApp para solicitar información sobre los servicios psicológicos.</p>
          <a className="btn" href="https://wa.link/waqiux" target="_blank" rel="noopener noreferrer">
            📱 Abrir WhatsApp
          </a>
        </div>

        <div className="card">
          <h3>Correo</h3>
          <p className="muted">
            <strong>andrea34arias@gmail.com</strong>
          </p>
          <a className="btn" href="mailto:andrea34arias@gmail.com">
            📧 Enviar correo
          </a>
        </div>
      </div>

      <div className="card locationCard">
        <p className="locationBadge">📍 Ubicación</p>
        <h3>Consultorio en Cuenca</h3>
        <p className="locationAddress">Rodríguez Parra 11-39 y Mariano Cueva, Cuenca - Ecuador</p>
        <p className="locationNote">✨ Espacio privado y de fácil acceso ✨</p>
        <a
          className="btn"
          href="https://maps.app.goo.gl/MaEni4x9gsDXTmSDA"
          target="_blank"
          rel="noopener noreferrer"
        >
          📍 Ver ubicación
        </a>
      </div>

      <div className="footer">
        <a className="btn" href={calendlyUrl} target="_blank" rel="noopener noreferrer">
          ➡️ Agenda tu consulta
        </a>
        <p className="muted small">© {new Date().getFullYear()} Andrea Arias</p>
      </div>
    </section>
  )
}
