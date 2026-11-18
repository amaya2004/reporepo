import ImagenSegura from './ImagenSegura.jsx'
import { REDES } from '../recursos.js'

export default function Footer({ total }) {
  return (
    <footer id="contacto" className="site-footer pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h2 className="h6 text-uppercase">Caja de ANDE</h2>
            <p className="small mb-0">Beneficios comerciales para sus asociados.</p>
          </div>
          <div className="col-6 col-md-2">
            <h2 className="h6 text-uppercase">Enlaces</h2>
            <ul className="list-unstyled small">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#categorias">Categorías</a></li>
              <li><a href="#beneficios">Beneficios</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h2 className="h6 text-uppercase">Información</h2>
            <ul className="list-unstyled small">
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Contáctenos</a></li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h2 className="h6 text-uppercase">Síganos</h2>
            <ul className="list-inline redes mb-0">
              {REDES.map((r) => (
                <li className="list-inline-item" key={r.nombre}>
                  <a href="#" aria-label={r.nombre}>
                    <ImagenSegura src={r.icono} alt="" modo="texto" textoAlterno={r.nombre} claseTexto="red-texto" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="border-light opacity-25" />
        <p className="small text-center mb-0">
          Total de beneficios cargados: <strong>{total}</strong> · Prueba técnica
        </p>
      </div>
    </footer>
  )
}
