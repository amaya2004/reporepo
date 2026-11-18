import ImagenSegura from './ImagenSegura.jsx'
import { ICONOS } from '../recursos.js'

// Icono "Todos" (SVG entregado en ENLACES_RECURSOS.txt)
function IconoTodos() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.8" fill="currentColor" />
    </svg>
  )
}

export default function Categorias({ categorias, activa, onSeleccionar }) {
  return (
    <section id="categorias" className="categorias py-3" aria-label="Categorías">
      <div className="container">
        <div className="categorias-franja" role="group" aria-label="Filtrar por categoría">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className="categoria-btn"
              aria-pressed={cat === activa}
              onClick={() => onSeleccionar(cat)}
            >
              {cat === 'Todos'
                ? <IconoTodos />
                : <ImagenSegura src={ICONOS[cat]} alt="" modo="ocultar" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
