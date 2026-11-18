import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Categorias from './components/Categorias.jsx'
import Promo from './components/Promo.jsx'
import ListaBeneficios from './components/ListaBeneficios.jsx'
import Footer from './components/Footer.jsx'

// Quita tildes y mayúsculas para buscar
const normalizar = (t) => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Extrae el porcentaje de un texto ("30% Desc" -> 30)
const porcentaje = (b) => {
  const m = /(\d+)\s*%/.exec(b.textoPromocion || b.descripcionCorta || '')
  return m ? parseInt(m[1], 10) : 0
}

export default function App() {
  const [beneficios, setBeneficios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [texto, setTexto] = useState('')

  // 1. Leer beneficios.json con fetch al montar el componente
  useEffect(() => {
    async function cargarDatos() {
      try {
        const res = await fetch(import.meta.env.BASE_URL + 'beneficios.json')
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const datos = await res.json()
        if (!Array.isArray(datos)) throw new Error('Formato de datos inválido')
        setBeneficios(datos)
      } catch (err) {
        console.error('Error al cargar beneficios.json:', err)
        setError('No se pudieron cargar los beneficios. Verifique que el proyecto se ejecute con "npm run dev".')
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
  }, [])

  // 2. Datos derivados del JSON
  const categorias = useMemo(
    () => ['Todos', ...new Set(beneficios.map((b) => b.categoria))],
    [beneficios]
  )

  const indicadores = useMemo(() => ({
    total: beneficios.length,
    categorias: new Set(beneficios.map((b) => b.categoria)).size,
    conDescuento: beneficios.filter((b) => /%/.test(b.textoPromocion || '')).length,
  }), [beneficios])

  const destacado = useMemo(
    () => beneficios.reduce((a, b) => (porcentaje(b) > porcentaje(a) ? b : a), beneficios[0]),
    [beneficios]
  )

  // 3. Filtro por categoría + búsqueda
  const visibles = useMemo(() => {
    const q = normalizar(texto)
    return beneficios.filter((b) => {
      const okCategoria = categoria === 'Todos' || b.categoria === categoria
      const base = normalizar([b.nombre, b.categoria, b.descripcionCorta, b.textoPromocion].join(' '))
      return okCategoria && (!q || base.includes(q))
    })
  }, [beneficios, categoria, texto])

  return (
    <>
      <a className="visually-hidden-focusable skip-link" href="#beneficios">Saltar al contenido</a>
      <Header />
      <main>
        <Hero indicadores={indicadores} cargando={cargando} />
        <Categorias categorias={categorias} activa={categoria} onSeleccionar={setCategoria} />
        <Promo beneficios={beneficios} destacado={destacado} cargando={cargando} />
        <ListaBeneficios
          visibles={visibles}
          total={beneficios.length}
          cargando={cargando}
          error={error}
          texto={texto}
          onBuscar={setTexto}
        />
      </main>
      <Footer total={beneficios.length} />
    </>
  )
}
