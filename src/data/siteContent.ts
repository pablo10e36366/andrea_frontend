export const CALENDLY_AGENDAR = 'https://calendly.com/psicologa-andrearias/agenda-consulta-psicologica'
export const WHATSAPP_VOCACIONAL = 'https://wa.link/bzkv06'
export const WHATSAPP_PLAN_4 = 'https://wa.link/dzcyhk'
export const WHATSAPP_PLAN_8 = 'https://wa.link/l04p1y'

export type SocialLink = {
  href: string
  label: string
  icon: string
}

export type MenuLink = {
  href: string
  label: string
  external?: boolean
}

export type Testimonial = {
  author: string
  quote: string
}

export type CountryOption = {
  name: string
  code: string
  flagSrc: string
  flagAlt: string
}

export type FreeResource = {
  href: string
  label: string
}

export type FaqItem = {
  question: string
  type: 'ordered' | 'unordered' | 'paragraph'
  items?: string[]
  text?: string
}

export type WorkbookGuide = {
  title: string
  slug: string
  description: string
  priceLabel: string
}

export const socialLinks: SocialLink[] = [
  {
    href: 'https://www.instagram.com/psic.andrearias?igsh=MTdkeDQ4YmZxNmdmOA%3D%3D&utm_source=qr',
    label: 'Instagram',
    icon: 'https://cdn.simpleicons.org/instagram/2f5d50',
  },
  {
    href: 'https://www.tiktok.com/@psic.andrearias?_r=1&_t=ZS-94GDd4C1zdt',
    label: 'TikTok',
    icon: 'https://cdn.simpleicons.org/tiktok/2f5d50',
  },
  {
    href: 'https://wa.link/waqiux',
    label: 'WhatsApp',
    icon: 'https://cdn.simpleicons.org/whatsapp/2f5d50',
  },
]

export const menuLinks: MenuLink[] = [
  { href: '/agendar', label: '📅 Agendar cita' },
  { href: '/sobre-mi', label: '👩🏻‍⚕️ Sobre mí' },
  { href: '/servicios', label: '🌿 Servicios' },
  { href: '/cursos', label: '📚 Cursos y guias disponibles' },
  { href: '/precios', label: '💻 Sesiones y precios' },
  { href: '/formulario', label: '🧾 ¿No sabes por dónde empezar?' },
  { href: '/material', label: '📝 Material psicológico gratuito' },
  { href: '/faq', label: '💭 Preguntas frecuentes' },
  {
    href: 'https://whatsapp.com/channel/0029Vb6hKyAGzzKWrtdQqz3H',
    label: '🔔 Canal de difusión',
    external: true,
  },
]

export const testimonials: Testimonial[] = [
  {
    author: 'Leslie',
    quote:
      '“Lo que más me gustó de tomar terapia con Andrea es que siempre me sentí segura. Tenía a alguien que me escuchaba, me entendía y en quien podía confiar y hablar, sin ser criticada. Esto me ayudó a tener más confianza en mí misma, aumentar mi autoestima y seguir adelante sin quedarme estancada.”',
  },
  {
    author: 'Diego',
    quote:
      '“La orientación vocacional me ayudó a clarificar mis intereses y a descubrir qué carreras realmente se alineaban con mis habilidades y valores. Me sentí comprendido y guiado sin presiones. Ahora tengo más seguridad en mis decisiones y un plan claro para mi futuro académico y profesional.”',
  },
  {
    author: 'Melissa',
    quote:
      '“Las sesiones me ayudaron a entender y manejar mi ansiedad. Siempre tuve su apoyo y comprensión sin sentirme juzgada. Gracias a esto, he aprendido a controlar mis emociones y recuperar la confianza en mí misma.”',
  },
]

export const serviceChips = [
  'Ansiedad y depresión',
  'Autoestima y dependencia emocional',
  'Dificultades en relaciones de pareja y familiares',
  'Manejo del estrés y crisis personales',
  'Estrés laboral y académico',
  'Duelo y rupturas afectivas',
  'Problemas de identidad y sentido de vida',
  'Atención a víctimas de violencia',
  'Acompañamiento psicológico para estudiantes',
  'Evaluación psicológica',
  'Orientación vocacional',
  'Informes psicológicos',
  'Aplicación de pruebas psicométricas y proyectivas',
  'Talleres grupales',
  'Acompañamiento en tareas',
]

export const countries: CountryOption[] = [
  { name: 'Ecuador', code: '+593', flagSrc: '/flags/ec.svg', flagAlt: 'Bandera de Ecuador' },
  { name: 'Alemania', code: '+49', flagSrc: '/flags/de.svg', flagAlt: 'Bandera de Alemania' },
  { name: 'Argentina', code: '+54', flagSrc: '/flags/ar.svg', flagAlt: 'Bandera de Argentina' },
  { name: 'Bolivia', code: '+591', flagSrc: '/flags/bo.svg', flagAlt: 'Bandera de Bolivia' },
  { name: 'Brasil', code: '+55', flagSrc: '/flags/br.svg', flagAlt: 'Bandera de Brasil' },
  { name: 'Canadá', code: '+1', flagSrc: '/flags/ca.svg', flagAlt: 'Bandera de Canadá' },
  { name: 'Chile', code: '+56', flagSrc: '/flags/cl.svg', flagAlt: 'Bandera de Chile' },
  { name: 'Colombia', code: '+57', flagSrc: '/flags/co.svg', flagAlt: 'Bandera de Colombia' },
  { name: 'Costa Rica', code: '+506', flagSrc: '/flags/cr.svg', flagAlt: 'Bandera de Costa Rica' },
  { name: 'Cuba', code: '+53', flagSrc: '/flags/cu.svg', flagAlt: 'Bandera de Cuba' },
  { name: 'El Salvador', code: '+503', flagSrc: '/flags/sv.svg', flagAlt: 'Bandera de El Salvador' },
  { name: 'España', code: '+34', flagSrc: '/flags/es.svg', flagAlt: 'Bandera de España' },
  { name: 'Estados Unidos', code: '+1', flagSrc: '/flags/us.svg', flagAlt: 'Bandera de Estados Unidos' },
  { name: 'Francia', code: '+33', flagSrc: '/flags/fr.svg', flagAlt: 'Bandera de Francia' },
  { name: 'Guatemala', code: '+502', flagSrc: '/flags/gt.svg', flagAlt: 'Bandera de Guatemala' },
  { name: 'Honduras', code: '+504', flagSrc: '/flags/hn.svg', flagAlt: 'Bandera de Honduras' },
  { name: 'Italia', code: '+39', flagSrc: '/flags/it.svg', flagAlt: 'Bandera de Italia' },
  { name: 'México', code: '+52', flagSrc: '/flags/mx.svg', flagAlt: 'Bandera de México' },
  { name: 'Nicaragua', code: '+505', flagSrc: '/flags/ni.svg', flagAlt: 'Bandera de Nicaragua' },
  { name: 'Panamá', code: '+507', flagSrc: '/flags/pa.svg', flagAlt: 'Bandera de Panamá' },
  { name: 'Paraguay', code: '+595', flagSrc: '/flags/py.svg', flagAlt: 'Bandera de Paraguay' },
  { name: 'Perú', code: '+51', flagSrc: '/flags/pe.svg', flagAlt: 'Bandera de Perú' },
  { name: 'Puerto Rico', code: '+1', flagSrc: '/flags/pr.svg', flagAlt: 'Bandera de Puerto Rico' },
  { name: 'Reino Unido', code: '+44', flagSrc: '/flags/gb.svg', flagAlt: 'Bandera de Reino Unido' },
  {
    name: 'República Dominicana',
    code: '+1',
    flagSrc: '/flags/do.svg',
    flagAlt: 'Bandera de República Dominicana',
  },
  { name: 'Uruguay', code: '+598', flagSrc: '/flags/uy.svg', flagAlt: 'Bandera de Uruguay' },
  { name: 'Venezuela', code: '+58', flagSrc: '/flags/ve.svg', flagAlt: 'Bandera de Venezuela' },
]

export const serviceOptions = [
  'Terapia psicológica online',
  'Terapia psicológica presencial',
  'Orientación vocacional (estudiantes)',
  'Evaluación psicológica',
  'Informe psicológico',
  'Certificado psicológico',
  'Talleres grupales',
]

export const freeResources: FreeResource[] = [
  {
    href: 'https://www.canva.com/design/DAHClJuTPAI/skUCrZpXBV0bqxBKXV9VYA/edit?utm_content=DAHClJuTPAI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
    label: 'Cambia tus pensamientos negativos 🌪️➡️🌈',
  },
  {
    href: 'https://www.canva.com/design/DAHClUy9oaM/yXZ0Pw1-EV5Ziiqmm9VOyA/edit?utm_content=DAHClUy9oaM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
    label: 'Mindfulness 🧘🏻‍♀️🌿',
  },
  {
    href: 'https://www.canva.com/design/DAHClafZ38I/DG0MJDXYQI4GBhEjfwx2DQ/edit?utm_content=DAHClafZ38I&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
    label: 'Relajación rápida antes de exámenes o presentaciones 🌬️',
  },
]

export const faqItems: FaqItem[] = [
  {
    question: '¿Cómo se agenda una cita?',
    type: 'ordered',
    items: [
      'Elige un horario disponible en Calendly.',
      'Completa el formulario con tus datos.',
      'Luego me comunicaré contigo por WhatsApp para confirmar la cita y darte la información correspondiente.',
    ],
  },
  {
    question: '¿Puedo contactarte si tengo dudas?',
    type: 'paragraph',
    text: 'Sí, puedes escribirme por WhatsApp o correo electrónico si deseas más información sobre los servicios o el proceso terapéutico. Será un gusto poder ayudarte.',
  },
  {
    question: '¿Es confidencial lo que hablamos en sesión?',
    type: 'paragraph',
    text: 'Sí, la confidencialidad es un principio fundamental del proceso terapéutico. Toda la información compartida se maneja bajo normas de ética profesional y privacidad.',
  },
  {
    question: '¿Qué puedes esperar del proceso terapéutico?',
    type: 'unordered',
    items: [
      'Espacio seguro y sin juicios.',
      'Objetivos claros desde la primera sesión.',
      'Herramientas prácticas para tu día a día.',
      'Seguimiento constante.',
    ],
  },
]

export const workbookGuides: WorkbookGuide[] = [
  {
    title: 'Guia para el estres',
    slug: 'guia-para-el-estres',
    description: 'Workbook practico con herramientas para entender, regular y disminuir el estres paso a paso.',
    priceLabel: '$12.50',
  },
]
