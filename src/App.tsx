import { useEffect, useState } from 'react'
import { HashRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { FaqSection } from './components/FaqSection'
import { LeadFormSection } from './components/LeadFormSection'
import { MobileMenu } from './components/MobileMenu'
import { ContactSection, HomeActions, ProfileHeader, TestimonialsSection } from './components/HomeSections'
import { PaypalCancelPage, PaypalSuccessPage } from './components/PaypalStatusPage'
import {
  AboutSection,
  AgendarSection,
  CoursesSection,
  FreeMaterialSection,
  PricingSection,
  ServicesSection,
  WorkbookGuidePageSection,
  WorkbooksLandingSection,
} from './components/DetailSections'
import {
  CALENDLY_AGENDAR,
  WHATSAPP_PLAN_4,
  WHATSAPP_PLAN_8,
  WHATSAPP_VOCACIONAL,
  countries,
  faqItems,
  freeResources,
  menuLinks,
  serviceChips,
  serviceOptions,
  socialLinks,
  testimonials,
  workbookGuides,
} from './data/siteContent'

function HomePage() {
  return (
    <>
      <ProfileHeader socialLinks={socialLinks} />
      <HomeActions calendlyUrl={CALENDLY_AGENDAR} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection calendlyUrl={CALENDLY_AGENDAR} />
    </>
  )
}

type DetailPageProps = {
  children: React.ReactNode
}

function DetailPage({ children }: DetailPageProps) {
  return (
    <>
      <div className="detailTop">
        <Link className="backLink" to="/">
          Volver al inicio
        </Link>
      </div>
      {children}
    </>
  )
}

function AppContent() {
  const [phone, setPhone] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <div className="bg" />

      <MobileMenu
        menuOpen={menuOpen}
        onToggle={() => setMenuOpen((value) => !value)}
        onClose={() => setMenuOpen(false)}
        links={menuLinks}
      />

      <main className="wrap">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/agendar"
            element={
              <DetailPage>
                <AgendarSection calendlyUrl={CALENDLY_AGENDAR} />
              </DetailPage>
            }
          />
          <Route
            path="/sobre-mi"
            element={
              <DetailPage>
                <AboutSection calendlyUrl={CALENDLY_AGENDAR} />
              </DetailPage>
            }
          />
          <Route
            path="/servicios"
            element={
              <DetailPage>
                <ServicesSection serviceChips={serviceChips} />
              </DetailPage>
            }
          />
          <Route
            path="/cursos"
            element={
              <DetailPage>
                <CoursesSection />
              </DetailPage>
            }
          />
          <Route
            path="/workbooks"
            element={
              <DetailPage>
                <WorkbooksLandingSection guides={workbookGuides} />
              </DetailPage>
            }
          />
          <Route
            path="/workbooks/guia-para-el-estres"
            element={
              <DetailPage>
                <WorkbookGuidePageSection />
              </DetailPage>
            }
          />
          <Route
            path="/precios"
            element={
              <DetailPage>
                <PricingSection
                  calendlyUrl={CALENDLY_AGENDAR}
                  whatsappPlan4={WHATSAPP_PLAN_4}
                  whatsappPlan8={WHATSAPP_PLAN_8}
                  whatsappVocacional={WHATSAPP_VOCACIONAL}
                />
              </DetailPage>
            }
          />
          <Route
            path="/formulario"
            element={
              <DetailPage>
                <LeadFormSection
                  countries={countries}
                  phone={phone}
                  serviceOptions={serviceOptions}
                  onPhoneChange={setPhone}
                />
              </DetailPage>
            }
          />
          <Route
            path="/material"
            element={
              <DetailPage>
                <FreeMaterialSection resources={freeResources} />
              </DetailPage>
            }
          />
          <Route
            path="/faq"
            element={
              <DetailPage>
                <FaqSection
                  items={faqItems}
                  openFaq={openFaq}
                  onToggle={(index) => setOpenFaq(openFaq === index ? null : index)}
                />
              </DetailPage>
            }
          />
          <Route
            path="/pago-exitoso"
            element={
              <DetailPage>
                <PaypalSuccessPage />
              </DetailPage>
            }
          />
          <Route
            path="/pago-cancelado"
            element={
              <DetailPage>
                <PaypalCancelPage />
              </DetailPage>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}

export default App
