import ImagenSegura from './ImagenSegura.jsx'

export default function TarjetaBeneficio({ beneficio }) {
  const { nombre, categoria, descripcionCorta, textoPromocion, urlImagen, urlLogo } = beneficio
  return (
    <div className="col">
      <article className="card h-100 tarjeta-beneficio">
        <div className="tarjeta-img-wrap">
          <ImagenSegura className="tarjeta-img" src={urlImagen} alt={`Imagen de ${nombre}`} loading="lazy" />
          <span className="tarjeta-promo">{textoPromocion}</span>
          <ImagenSegura className="tarjeta-logo" src={urlLogo} alt={`Logo de ${nombre}`} modo="ocultar" loading="lazy" />
        </div>
        <div className="card-body">
          <p className="tarjeta-categoria mb-1">{categoria}</p>
          <h3 className="card-title h5">{nombre}</h3>
          <p className="card-text mb-0">{descripcionCorta}</p>
        </div>
      </article>
    </div>
  )
}
