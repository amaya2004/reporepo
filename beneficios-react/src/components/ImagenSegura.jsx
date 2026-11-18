import { useState } from 'react'
import { PLACEHOLDER } from '../recursos.js'

// Imagen con manejo de error.
// modo: 'placeholder' (imagen de respaldo), 'ocultar' (no muestra nada), 'texto' (muestra textoAlterno)
export default function ImagenSegura({ src, alt, className, modo = 'placeholder', textoAlterno, claseTexto, ...rest }) {
  const [fallo, setFallo] = useState(!src)

  if (fallo) {
    if (modo === 'ocultar') return null
    if (modo === 'texto') return <span className={claseTexto}>{textoAlterno || alt}</span>
    return <img src={PLACEHOLDER} alt={alt} className={className} />
  }

  return <img src={src} alt={alt} className={className} onError={() => setFallo(true)} {...rest} />
}
