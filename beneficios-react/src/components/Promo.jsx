import ImagenSegura from './ImagenSegura.jsx'
import { BANNER_MUJER } from '../recursos.js'

export default function Promo({ beneficios, destacado, cargando }) {
  const fondo = destacado?.urlImagenFondo ? { backgroundImage: `url("${destacado.urlImagenFondo}")` } : undefined

  return (
    <section id="destacado" className="promo py-5">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          {/* Izquierda: banner mujer con tarjeta */}
          <div className="col-12 col-lg-6">
            <div className="promo-banner h-100">
              <ImagenSegura
                src={BANNER_MUJER}
                alt="Mujer con tarjeta de Caja de ANDE"
                className="img-fluid"
                modo="texto"
                textoAlterno="Banner no disponible"
                claseTexto="banner-fallback"
              />
            </div>
          </div>

          {/* Derecha: cintillo de comercios + beneficio destacado */}
          <div className="col-12 col-lg-6 d-flex flex-column gap-3">
            <div className="cintillo" aria-label="Comercios aliados">
              <marquee behavior="scroll" direction="left" scrollamount="5">
                {beneficios.map((b) => (
                  <span className="cintillo-item" key={b.id}>
                    <ImagenSegura src={b.urlLogo} alt="" modo="ocultar" />
                    <span>{b.nombre}</span>
                  </span>
                ))}
              </marquee>
            </div>

            <div className="destacado flex-grow-1" style={fondo}>
              <div className="destacado-contenido">
                <span className="badge bg-warning text-dark">Beneficio destacado</span>
                <h2 className="h3 mt-2">
                  {cargando ? 'Cargando...' : destacado ? destacado.nombre : 'Beneficios no disponibles'}
                </h2>
                {destacado && <p className="mb-0">{destacado.descripcionCorta}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
