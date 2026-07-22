import { Link } from 'react-router-dom'

import type { FreeResource, WorkbookGuide } from '../data/siteContent'
import { PaidGuideSection } from './PaidGuideSection'

type AboutSectionProps = {
  calendlyUrl: string
}

export function AgendarSection({ calendlyUrl }: AboutSectionProps) {
  return (
    <section id="detail-agendar" className="section">
      <h2>Agendar cita</h2>
      <div className="card">
        <p>Selecciona el horario que mejor te funcione y reserva tu sesión.</p>
        <a className="btn" href={calendlyUrl} target="_blank" rel="noopener noreferrer">
          Agendar ahora
        </a>
      </div>
    </section>
  )
}

export function AboutSection({ calendlyUrl }: AboutSectionProps) {
  return (
    <section id="detail-sobre-mi" className="section">
      <h2>Sobre mí</h2>

      <div className="card">
        <div className="aboutIntro">
          <div className="aboutCopy">
            <p>
              Soy Andrea Arias, psicóloga clínica, con formación en terapia cognitivo-conductual y enfoque integral.
              Trabajo con niños, jóvenes y adultos, adaptando estrategias a cada etapa.
            </p>

            <p>
              Me gusta trabajar con sesiones organizadas y orientadas a objetivos: cada encuentro tiene dirección clara,
              seguimiento y herramientas prácticas aplicables a tu vida diaria.
            </p>
          </div>

          <figure className="aboutPhotoWrap">
            <img className="aboutPhoto" src="/sobre_mi.JPG" alt="Andrea Arias durante una consulta virtual" />
          </figure>
        </div>

        <p>
          Estoy en constante formación a través de diplomados, cursos y seminarios, lo que me permite brindar atención
          profesional de calidad y actualizar mis herramientas de intervención.
        </p>

        <div className="actions">
          <a className="btn" href={calendlyUrl} target="_blank" rel="noopener noreferrer">
            Agenda tu primera sesión hoy
          </a>
        </div>
      </div>
    </section>
  )
}

type ServicesSectionProps = {
  serviceChips: string[]
}

export function ServicesSection({ serviceChips }: ServicesSectionProps) {
  return (
    <section id="detail-servicios" className="section">
      <h2>¿En qué puedo ayudarte?</h2>
      <p className="muted">Servicios principales</p>

      <div className="chips">
        {serviceChips.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>

      <div className="note">
        ¿Buscas recursos complementarios? <Link to="/cursos">Explora el apartado de cursos, talleres y guías</Link>.
      </div>
    </section>
  )
}

export function CoursesSection() {
  return (
    <section id="detail-cursos" className="section">
      <h2>Cursos y guías disponibles</h2>
      <p className="muted">Recursos formativos y prácticos con acceso adicional de pago.</p>

      <div className="grid">
        <div className="card workbookCategory">
          <h3>Workbooks</h3>
          <p>Guías prácticas en PDF para leer, trabajar ejercicios y aplicar herramientas concretas a tu ritmo.</p>
          <p className="muted small">Entra aquí para ver todas las guías disponibles y abrir la vista previa.</p>
          <Link className="btn" to="/workbooks">
            Ver workbooks
          </Link>
        </div>

        <div className="card">
          <h3>Talleres guiados</h3>
          <p>Encuentros prácticos con ejercicios, hojas de trabajo y acompañamiento puntual sobre un tema específico.</p>
          <p className="muted small">Pensado para estudiantes, padres, parejas o personas en proceso terapéutico.</p>
        </div>
      </div>
    </section>
  )
}

type WorkbooksLandingSectionProps = {
  guides: WorkbookGuide[]
}

export function WorkbooksLandingSection({ guides }: WorkbooksLandingSectionProps) {
  return (
    <section id="detail-workbooks" className="section">
      <h2>Workbooks</h2>
      <p className="muted">Abre cada guía, revisa las primeras 3 páginas y desbloquea el acceso completo si quieres seguir leyendo.</p>

      <div className="grid">
        {guides.map((guide) => (
          <article key={guide.slug} className="card workbookCard">
            <p className="workbookCard__tag">Vista previa de 3 páginas</p>
            <h3>{guide.title}</h3>
            <p>{guide.description}</p>
            <p className="muted small">Acceso completo: {guide.priceLabel}</p>
            <Link className="btn" to={`/workbooks/${guide.slug}`}>
              Abrir workbook
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export function WorkbookGuidePageSection() {
  return (
    <section id="detail-workbook-guide" className="section">
      <h2>Workbook: Guía para el estrés</h2>
      <p className="muted">Puedes leer gratis las primeras 3 páginas. Para continuar desde la página 4, necesitas desbloquear el acceso completo.</p>
      <PaidGuideSection />
    </section>
  )
}

type PricingSectionProps = {
  calendlyUrl: string
  whatsappPlan4: string
  whatsappPlan8: string
  whatsappVocacional: string
}

export function PricingSection({
  calendlyUrl,
  whatsappPlan4,
  whatsappPlan8,
  whatsappVocacional,
}: PricingSectionProps) {
  return (
    <section id="detail-precios" className="section">
      <h2>Sesiones y precios</h2>
      <p className="muted">Atención online vía Zoom y presencial.</p>

      <div className="actions">
        <a
          className="btn"
          href="https://maps.app.goo.gl/MaEni4x9gsDXTmSDA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver ubicación para sesión presencial
        </a>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Sesión individual</h3>
          <ul>
            <li>
              <strong>40-50 min</strong> - <strong>$20</strong>
            </li>
          </ul>
          <a className="btn" href={calendlyUrl} target="_blank" rel="noopener noreferrer">
            Agendar sesión
          </a>
        </div>

        <div className="card">
          <h3>Plan Proceso Terapéutico</h3>
          <ul>
            <li>
              Incluye <strong>4 sesiones</strong> de terapia psicológica individual
            </li>
            <li className="muted">Incluye evaluación, intervención y seguimiento.</li>
            <li className="muted">Proceso terapéutico breve y enfocado.</li>
            <li className="muted">Ideal para trabajar objetivos específicos y dar continuidad al proceso.</li>
          </ul>
          <a className="btn" href={whatsappPlan4} target="_blank" rel="noopener noreferrer">
            Consultar plan de 4 sesiones
          </a>
        </div>

        <div className="card">
          <h3>Plan Proceso Terapéutico</h3>
          <ul>
            <li>
              Incluye <strong>8 sesiones</strong> de terapia psicológica individual
            </li>
            <li className="muted">Incluye evaluación, intervención y seguimiento.</li>
            <li className="muted">Acompañamiento continuo durante todo el proceso terapéutico.</li>
            <li className="muted">Proceso de acompañamiento para lograr cambios reales y sostenidos.</li>
          </ul>
          <a className="btn" href={whatsappPlan8} target="_blank" rel="noopener noreferrer">
            Consultar plan de 8 sesiones
          </a>
        </div>

        <div className="card">
          <h3>Orientación Vocacional</h3>
          <ul>
            <li>Test de intereses profesionales</li>
            <li>Interpretación + recomendaciones</li>
            <li>
              <strong>60 min</strong> - <strong>$30</strong>
            </li>
          </ul>
          <a className="btn" href={whatsappVocacional} target="_blank" rel="noopener noreferrer">
            Si deseas más información sobre la orientación vocacional, haz clic aquí.
          </a>
        </div>
      </div>

      <div className="note">
        ¿No sabes por dónde empezar? <Link to="/formulario">Llena el formulario de inicio</Link> y te guío.
      </div>
    </section>
  )
}

type FreeMaterialSectionProps = {
  resources: FreeResource[]
}

export function FreeMaterialSection({ resources }: FreeMaterialSectionProps) {
  return (
    <section id="detail-material" className="section">
      <h2>Material psicológico gratuito</h2>

      <div className="card">
        <p className="muted">Recursos cortos y prácticos.</p>

        <div className="resourceActions">
          {resources.map((item) => (
            <a
              key={item.label}
              className="btn resourceBtn"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))}
        </div>

        <p className="muted small">
          Estos recursos no reemplazan la psicoterapia, pero ofrecen orientación inicial y herramientas prácticas.
        </p>
      </div>
    </section>
  )
}
