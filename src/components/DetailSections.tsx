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
        <p>Selecciona el horario que mejor te funcione y reserva tu sesion.</p>
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
      <h2>Sobre mi</h2>

      <div className="card">
        <div className="aboutIntro">
          <div className="aboutCopy">
            <p>
              Soy Andrea Arias, Psicologa Clinica, con formacion en Terapia Cognitivo Conductual y enfoque integral.
              Trabajo con ninos, jovenes y adultos, adaptando estrategias a cada etapa.
            </p>

            <p>
              Me gusta trabajar con sesiones organizadas y orientadas a objetivos: cada encuentro tiene direccion clara,
              seguimiento y herramientas practicas aplicables a tu vida diaria.
            </p>
          </div>

          <figure className="aboutPhotoWrap">
            <img className="aboutPhoto" src="/sobre_mi.JPG" alt="Andrea Arias durante una consulta virtual" />
          </figure>
        </div>

        <p>
          Estoy en constante formacion a traves de diplomados, cursos y seminarios, lo que me permite brindar atencion
          profesional de calidad y actualizar mis herramientas de intervencion.
        </p>

        <div className="actions">
          <a className="btn" href={calendlyUrl} target="_blank" rel="noopener noreferrer">
            Agenda tu primera sesion hoy
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
      <h2>En que puedo ayudarte?</h2>
      <p className="muted">Servicios principales</p>

      <div className="chips">
        {serviceChips.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>

      <div className="note">
        Buscas recursos complementarios? <Link to="/cursos">Explora el apartado de cursos, talleres y guias</Link>.
      </div>
    </section>
  )
}

export function CoursesSection() {
  return (
    <section id="detail-cursos" className="section">
      <h2>Cursos y guias disponibles</h2>
      <p className="muted">Recursos formativos y practicos con acceso adicional de pago.</p>

      <div className="grid">
        <div className="card workbookCategory">
          <h3>Workbooks</h3>
          <p>Guias practicas en PDF para leer, trabajar ejercicios y aplicar herramientas concretas a tu ritmo.</p>
          <p className="muted small">Entra aqui para ver todas las guias disponibles y abrir la vista previa.</p>
          <Link className="btn" to="/workbooks">
            Ver workbooks
          </Link>
        </div>

        <div className="card">
          <h3>Talleres guiados</h3>
          <p>Encuentros practicos con ejercicios, hojas de trabajo y acompanamiento puntual sobre un tema especifico.</p>
          <p className="muted small">Pensado para estudiantes, padres, parejas o personas en proceso terapeutico.</p>
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
      <p className="muted">Abre cada guia, revisa las primeras 3 paginas y desbloquea el acceso completo si quieres seguir leyendo.</p>

      <div className="grid">
        {guides.map((guide) => (
          <article key={guide.slug} className="card workbookCard">
            <p className="workbookCard__tag">Vista previa de 3 paginas</p>
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
      <h2>Workbook: Guia para el estres</h2>
      <p className="muted">Puedes leer gratis las primeras 3 paginas. Para continuar desde la pagina 4, necesitas desbloquear el acceso completo.</p>
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
      <p className="muted">Atencion Online via Zoom y presencial.</p>

      <div className="actions">
        <a
          className="btn"
          href="https://maps.app.goo.gl/MaEni4x9gsDXTmSDA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver ubicacion para sesion presencial
        </a>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Sesion individual</h3>
          <ul>
            <li>
              <strong>40-50 min</strong> - <strong>$20</strong>
            </li>
          </ul>
          <a className="btn" href={calendlyUrl} target="_blank" rel="noopener noreferrer">
            Agendar sesion
          </a>
        </div>

        <div className="card">
          <h3>Plan Proceso Terapeutico</h3>
          <ul>
            <li>
              Incluye <strong>4 sesiones</strong> de terapia psicologica individual
            </li>
            <li className="muted">Incluye evaluacion, intervencion y seguimiento.</li>
            <li className="muted">Proceso terapeutico breve y enfocado.</li>
            <li className="muted">Ideal para trabajar objetivos especificos y dar continuidad al proceso.</li>
          </ul>
          <a className="btn" href={whatsappPlan4} target="_blank" rel="noopener noreferrer">
            Consultar plan de 4 sesiones
          </a>
        </div>

        <div className="card">
          <h3>Plan Proceso Terapeutico</h3>
          <ul>
            <li>
              Incluye <strong>8 sesiones</strong> de terapia psicologica individual
            </li>
            <li className="muted">Incluye evaluacion, intervencion y seguimiento.</li>
            <li className="muted">Acompanamiento continuo durante todo el proceso terapeutico.</li>
            <li className="muted">Proceso de acompanamiento para lograr cambios reales y sostenidos.</li>
          </ul>
          <a className="btn" href={whatsappPlan8} target="_blank" rel="noopener noreferrer">
            Consultar plan de 8 sesiones
          </a>
        </div>

        <div className="card">
          <h3>Orientacion Vocacional</h3>
          <ul>
            <li>Test de intereses profesionales</li>
            <li>Interpretacion + recomendaciones</li>
            <li>
              <strong>60 min</strong> - <strong>$30</strong>
            </li>
          </ul>
          <a className="btn" href={whatsappVocacional} target="_blank" rel="noopener noreferrer">
            Si deseas mas informacion sobre la orientacion vocacional click aqui.
          </a>
        </div>
      </div>

      <div className="note">
        No sabes por donde empezar? <Link to="/formulario">Llena el formulario de inicio</Link> y te guio.
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
      <h2>Material psicologico gratuito</h2>

      <div className="card">
        <p className="muted">Recursos cortos y practicos.</p>

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
          Estos recursos no reemplazan la psicoterapia, pero ofrecen orientacion inicial y herramientas practicas.
        </p>
      </div>
    </section>
  )
}
