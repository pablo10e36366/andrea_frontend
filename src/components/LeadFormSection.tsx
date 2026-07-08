import type { CountryOption } from '../data/siteContent'
import { CountrySelect } from './CountrySelect'

type LeadFormSectionProps = {
  countries: CountryOption[]
  phone: string
  serviceOptions: string[]
  onPhoneChange: (value: string) => void
}

export function LeadFormSection({
  countries,
  phone,
  serviceOptions,
  onPhoneChange,
}: LeadFormSectionProps) {
  return (
    <section id="detail-formulario" className="section">
      <h2>¿No sabes por dónde empezar?</h2>
      <p className="muted">Déjame ayudarte a dar el primer paso. Completa tus datos y me pondré en contacto contigo 👇</p>

      <form className="card form" action="https://formsubmit.co/andrea34arias@gmail.com" method="POST">
        <input type="hidden" name="_subject" value="Nuevo formulario de inicio - Andrea Arias" />
        <input type="hidden" name="_template" value="table" />
        <input type="text" name="_honey" className="honeypot" tabIndex={-1} autoComplete="off" />

        <label>
          Nombre completo
          <input name="nombre_completo" type="text" required placeholder="Tu nombre completo" />
        </label>

        <label>
          Edad
          <input name="edad" type="number" min="1" max="120" required placeholder="Tu edad" />
        </label>

        <label>
          Número celular
          <div className="phoneFields">
            <CountrySelect countries={countries} />

            <input
              name="numero_celular"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="tel-national"
              required
              placeholder="Tu número celular"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </label>

        <p className="fieldHint">Selecciona tu país o región y luego escribe tu número celular.</p>

        <label>
          Correo electrónico
          <input name="email" type="email" required placeholder="tucorreo@ejemplo.com" />
        </label>

        <label>
          ¿Qué servicio es de tu interés?
          <select name="servicio_interes" required defaultValue="">
            <option value="" disabled>
              Selecciona un servicio
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          ¿Qué esperas obtener de este espacio?
          <textarea
            name="expectativas"
            rows={4}
            required
            placeholder="Cuéntame qué esperas obtener de este espacio..."
          />
        </label>

        <p className="muted">¡Muchas gracias por completar este formulario! Aprecio tu tiempo y tu compromiso.</p>

        <button className="btn" type="submit">
          📩 Enviar
        </button>

        <p className="muted small">*Este formulario no reemplaza una sesión terapéutica*.</p>
      </form>
    </section>
  )
}
