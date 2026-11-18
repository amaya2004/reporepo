// URLs de los recursos visuales (ENLACES_RECURSOS.txt)
const BASE = 'https://storageproyectosmercadeo.blob.core.windows.net/masaccesosbeneficios/'

export const LOGOS = {
  ande: BASE + 'banners/Logocajadeande.png',
  beneficios: BASE + 'banners/Beneficios.png',
}

export const VIDEO = BASE + 'banners/carrusel_tarjetas_2.mp4'
export const BANNER_MUJER = BASE + 'banners/Mujertarjetabeneficios.png'

// Nombre de categoría en el JSON -> icono
export const ICONOS = {
  'Automotriz': BASE + 'iconos/Automotriz.png',
  'Deportes': BASE + 'iconos/Deporte.png',
  'Entretenimiento': BASE + 'iconos/Entretenimiento.png',
  'Hogar': BASE + 'iconos/Hogar.png',
  'Mascotas': BASE + 'iconos/Mascotas.png',
  'Moda y estilo': BASE + 'iconos/Modayestilo.png',
  'Restaurantes': BASE + 'iconos/Restaurantes.png',
  'Salud': BASE + 'iconos/Salud.png',
  'Servicios varios': BASE + 'iconos/Serviciosespecializados.png',
  'Tecnología': BASE + 'iconos/Tecnologia.png',
}

export const REDES = [
  { nombre: 'Facebook', icono: BASE + 'iconos/Redessociales/Facebook.png' },
  { nombre: 'Instagram', icono: BASE + 'iconos/Redessociales/Instagram.png' },
  { nombre: 'TikTok', icono: BASE + 'iconos/Redessociales/Tiktok.png' },
  { nombre: 'YouTube', icono: BASE + 'iconos/Redessociales/Youtube.png' },
  { nombre: 'LinkedIn', icono: BASE + 'iconos/Redessociales/Linkedin.png' },
]

// Imagen de respaldo cuando una imagen no carga
export const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
  '<rect width="400" height="300" fill="#e9eef5"/>' +
  '<text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="20" fill="#6b7a90">Imagen no disponible</text>' +
  '</svg>'
)
