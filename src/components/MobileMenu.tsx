import { NavLink } from 'react-router-dom'

import type { MenuLink } from '../data/siteContent'

type MobileMenuProps = {
  menuOpen: boolean
  onToggle: () => void
  onClose: () => void
  links: MenuLink[]
}

export function MobileMenu({ menuOpen, onToggle, onClose, links }: MobileMenuProps) {
  return (
    <>
      <button
        className={`menuToggle${menuOpen ? ' is-open' : ''}`}
        type="button"
        aria-label="Abrir menú"
        aria-controls="menuPanel"
        aria-expanded={menuOpen}
        onClick={onToggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <p className="menuToggleText">Servicios</p>

      {menuOpen && <div className="menuBackdrop" onClick={onClose}></div>}

      {menuOpen && (
        <nav className="menuPanel" id="menuPanel" aria-label="Menú principal">
          {links.map((item) =>
            item.external ? (
              <a
                key={item.href}
                className="menuItem"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.href}
                className={({ isActive }) => `menuItem${isActive ? ' is-active' : ''}`}
                to={item.href}
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      )}
    </>
  )
}
