import { VIDEO } from '../recursos.js'

function Indicador({ valor, texto }) {
  return (
    <div className="col-4">
      <div className="indicador">
        <span className="indicador-valor">{valor}</span>
        <span className="indicador-texto">{texto}</span>
      </div>
    </div>
  )
}

export default function Hero({ indicadores, cargando }) {
  const v = (n) => (cargando ? '-' : n)
  return (
    <section id="inicio" className="hero py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold">Descubra los beneficios comerciales de Caja de ANDE</h1>
            <p className="lead">Descuentos y promociones exclusivas en comercios aliados al pagar con sus tarjetas de Caja de ANDE.</p>
            {/* Indicadores calculados con el JSON */}
            <div className="row g-3 mt-2" aria-live="polite">
              <Indicador valor={v(indicadores.total)} texto="Beneficios" />
              <Indicador valor={v(indicadores.categorias)} texto="Categorías" />
              <Indicador valor={v(indicadores.conDescuento)} texto="Con descuento %" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ratio ratio-16x9 hero-video">
              <video controls muted playsInline preload="metadata" aria-label="Video de tarjetas de Caja de ANDE">
                <source src={VIDEO} type="video/mp4" />
                El video no está disponible en este momento.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
