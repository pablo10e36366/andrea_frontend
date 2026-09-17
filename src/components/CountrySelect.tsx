import { useEffect, useRef, useState } from 'react'

import type { CountryOption } from '../data/siteContent'

type CountrySelectProps = {
  countries: CountryOption[]
  defaultCode?: string
}

export function CountrySelect({ countries, defaultCode = '+593' }: CountrySelectProps) {
  const defaultCountry = countries.find((country) => country.code === defaultCode) ?? countries[0]
  if (!defaultCountry) return null

  return (
    <CountrySelectInput
      key={`${defaultCountry.name}-${defaultCountry.code}`}
      countries={countries}
      defaultCountry={defaultCountry}
    />
  )
}

function CountrySelectInput({ countries, defaultCountry }: {
  countries: CountryOption[]
  defaultCountry: CountryOption
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const [selectedKey, setSelectedKey] = useState(`${defaultCountry.name}-${defaultCountry.code}`)
  const selectedCountry = countries.find((country) => `${country.name}-${country.code}` === selectedKey) ?? defaultCountry

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="countrySelect" ref={wrapperRef}>
      <input type="hidden" name="codigo_pais" value={selectedCountry.code} />

      <button
        className="countrySelect__trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <img className="countrySelect__flag" src={selectedCountry.flagSrc} alt={selectedCountry.flagAlt} />
        <span className="countrySelect__text">
          {selectedCountry.name} ({selectedCountry.code})
        </span>
        <span className="countrySelect__caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {menuOpen && (
        <div className="countrySelect__menu" role="listbox" aria-label="Selecciona tu país o región">
          {countries.map((country) => {
            const isSelected =
              selectedCountry.name === country.name && selectedCountry.code === country.code

            return (
              <button
                key={`${country.name}-${country.code}`}
                className={`countryOption${isSelected ? ' is-selected' : ''}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedKey(`${country.name}-${country.code}`)
                  setMenuOpen(false)
                }}
              >
                <img className="countryOption__flag" src={country.flagSrc} alt="" aria-hidden="true" />
                <span>
                  {country.name} ({country.code})
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
