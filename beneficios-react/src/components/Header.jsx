import ImagenSegura from './ImagenSegura.jsx'
import { LOGOS } from '../recursos.js'

const ENLACES = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#categorias', texto: 'Categorías' },
  { href: '#destacado', texto: 'Destacado' },
  { href: '#beneficios', texto: 'Beneficios' },
  { href: '#contacto', texto: 'Contacto' },
]

export default function Header() {
  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" aria-label="Navegación principal">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-3" href="#inicio">
            <ImagenSegura className="logo-ande" src={LOGOS.ande} alt="Caja de ANDE" modo="texto" claseTexto="fw-bold text-primary" />
            <ImagenSegura className="logo-beneficios" src={LOGOS.beneficios} alt="Beneficios" modo="texto" claseTexto="fw-bold" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal"
            aria-controls="menuPrincipal"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menuPrincipal">
            <ul className="navbar-nav ms-auto">
              {ENLACES.map((e) => (
                <li className="nav-item" key={e.href}>
                  <a className="nav-link" href={e.href}>{e.texto}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
