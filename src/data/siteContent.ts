export const CALENDLY_AGENDAR = 'https://wa.link/qm4c8m'
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
  previewUrl: string
  downloadFilename: string
  topics: string[]
  tools: string[]
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
  { href: '/cursos', label: '📚 Cursos y guías disponibles' },
  { href: '/precios', label: '💻 Información sobre las sesiones' },
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
    title: 'Guía para la ansiedad',
    slug: 'guia-para-el-estres',
    description: 'Workbook práctico con herramientas para entender, regular y disminuir la ansiedad paso a paso.',
    priceLabel: '$12.50',
    previewUrl: '/previews/guia-para-el-estres-preview.pdf',
    downloadFilename: 'guia-para-la-ansiedad.pdf',
    topics: [
      'Qué es la ansiedad y cómo identificarla a tiempo.',
      'Señales físicas, emocionales y mentales más frecuentes.',
      'Ejercicios prácticos para recuperar la calma en minutos.',
      'Rutina sencilla para prevenir que la ansiedad te sobrepase.',
    ],
    tools: [
      'Ejercicio de respiración guiada.',
      'Checklist personal de detonantes.',
      'Plan breve de regulación emocional.',
      'Recomendaciones prácticas para el día a día.',
    ],
  },
  {
    title: 'Cómo dejar de procrastinar en 7 días',
    slug: 'como-dejar-de-procrastinar-en-7-dias',
    description: 'Workbook práctico para reconocer la procrastinación y avanzar con estrategias aplicables día a día.',
    priceLabel: '$12.50',
    previewUrl: '/previews/como-dejar-de-procrastinar-en-7-dias-preview.pdf',
    downloadFilename: 'como-dejar-de-procrastinar-en-7-dias.pdf',
    topics: [
      'Por qué postergas incluso las tareas importantes.',
      'Cómo detectar hábitos y pensamientos que mantienen la procrastinación.',
      'Estrategias prácticas para empezar sin esperar motivación.',
      'Plan de siete días para avanzar con constancia.',
    ],
    tools: [
      'Registro personal de tareas postergadas.',
      'Ejercicios para dividir objetivos en pasos pequeños.',
      'Plan diario de acción.',
      'Recomendaciones para mantener el hábito.',
    ],
  },
  {
    title: 'Sanar una ruptura amorosa',
    slug: 'sanar-una-ruptura-amorosa',
    description: 'Workbook de acompañamiento para procesar una ruptura amorosa y recuperar el bienestar emocional.',
    priceLabel: '$12.50',
    previewUrl: '/previews/sanar-una-ruptura-amorosa-preview.pdf',
    downloadFilename: 'sanar-una-ruptura-amorosa.pdf',
    topics: [
      'Cómo comprender el duelo después de una ruptura.',
      'Emociones frecuentes y formas saludables de procesarlas.',
      'Ejercicios para fortalecer el autocuidado y la autoestima.',
      'Pasos para reconstruir tu bienestar emocional.',
    ],
    tools: [
      'Ejercicios de reflexión personal.',
      'Plan de autocuidado emocional.',
      'Registro de avances y emociones.',
      'Recomendaciones para cerrar ciclos de manera saludable.',
    ],
  },
  {
    title: 'Desarrollo de habilidades sociales',
    slug: 'desarrollo-de-habilidades-sociales',
    description: 'Workbook con ejercicios para fortalecer la comunicación, la seguridad personal y las relaciones.',
    priceLabel: '$12.50',
    previewUrl: '/previews/desarrollo-de-habilidades-sociales-preview.pdf',
    downloadFilename: 'desarrollo-de-habilidades-sociales.pdf',
    topics: [
      'Qué son las habilidades sociales y por qué son importantes.',
      'Cómo comunicarte con claridad y seguridad.',
      'Estrategias para escuchar, expresarte y manejar conflictos.',
      'Ejercicios para fortalecer tus relaciones.',
    ],
    tools: [
      'Ejercicios de comunicación asertiva.',
      'Guía para practicar la escucha activa.',
      'Registro de situaciones sociales.',
      'Plan de mejora personal.',
    ],
  },
  {
    title: 'El poder del NO: establecimiento de límites',
    slug: 'el-poder-del-no-establecimiento-de-limites',
    description: 'Workbook práctico para aprender a decir no, establecer límites sanos y cuidar tu bienestar.',
    priceLabel: '$12.50',
    previewUrl: '/previews/el-poder-del-no-establecimiento-de-limites-preview.pdf',
    downloadFilename: 'el-poder-del-no-establecimiento-de-limites.pdf',
    topics: [
      'Por qué es importante aprender a decir no.',
      'Cómo reconocer límites personales y emocionales.',
      'Estrategias para comunicar límites con respeto.',
      'Ejercicios para reducir la culpa y cuidar tu bienestar.',
    ],
    tools: [
      'Guía de comunicación asertiva.',
      'Ejercicios para identificar límites.',
      'Frases prácticas para decir no.',
      'Plan personal de límites saludables.',
    ],
  },
  {
    title: 'Superación personal y crecimiento humano consciente',
    slug: 'superacion-personal-y-crecimiento-humano-consciente',
    description: 'Workbook para impulsar el autoconocimiento, la superación personal y un crecimiento consciente.',
    priceLabel: '$12.50',
    previewUrl: '/previews/superacion-personal-y-crecimiento-humano-consciente-preview.pdf',
    downloadFilename: 'superacion-personal-y-crecimiento-humano-consciente.pdf',
    topics: [
      'Cómo fortalecer el autoconocimiento y la confianza personal.',
      'Creencias y hábitos que influyen en tu crecimiento.',
      'Herramientas para definir objetivos con sentido.',
      'Prácticas para avanzar de forma consciente.',
    ],
    tools: [
      'Ejercicios de autoconocimiento.',
      'Registro de fortalezas y aprendizajes.',
      'Plan de crecimiento personal.',
      'Recomendaciones para mantener cambios sostenibles.',
    ],
  },
]
