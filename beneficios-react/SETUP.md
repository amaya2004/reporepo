# Beneficios Caja de ANDE (React)

Página adaptable para escritorio y móvil que muestra los 20 beneficios de `beneficios.json`. Está hecha con **React 18 + Vite**, Bootstrap 5 por CDN y `fetch` para leer el JSON local.

---

## 1. Setup (paso a paso)

### Requisitos
- **Node.js 18 o superior.** Revisa con `node -v`. Si no lo tienes, instala la versión LTS desde nodejs.org.
- npm (viene con Node). Revisa con `npm -v`.
- Internet para instalar dependencias y para Bootstrap, los logos, el video y las imágenes.

### Opción A: usar este proyecto
```bash
cd beneficios-react
npm install
npm run dev
```
Abre la URL que aparece en la terminal (normalmente http://localhost:5173).

Para ver la versión de producción:
```bash
npm run build
npm run preview
```

### Opción B: crearlo desde cero (si te dan una compu limpia)
```bash
npm create vite@latest beneficios-react -- --template react
cd beneficios-react
npm install
```
Después:
1. Copia `beneficios.json` a la carpeta `public/`.
2. Pega los links de Bootstrap (CSS y JS) en `index.html`.
3. Reemplaza `src/` con los archivos de este proyecto.
4. Borra `src/App.css` y `src/assets/` si no los usas.
5. Corre `npm run dev`.

### Por qué el JSON va en `public/`
Vite sirve `public/` en la raíz del servidor. Por eso `fetch('/beneficios.json')` funciona sin importarlo en el código. Además, React con Vite siempre corre en un servidor local (`npm run dev`), así que no existe el problema de `file://`.

---

## 2. Estructura

```
beneficios-react/
├── index.html              # HTML base: Bootstrap CDN y <div id="root">
├── package.json            # Dependencias y scripts (dev, build, preview)
├── vite.config.js          # Configuración de Vite con el plugin de React
├── public/
│   └── beneficios.json     # Los 20 beneficios (se leen con fetch)
└── src/
    ├── main.jsx            # Monta <App /> en #root e importa el CSS
    ├── App.jsx             # Estado, fetch del JSON, filtros y layout general
    ├── index.css           # Estilos propios (colores, tarjetas, franja, footer)
    ├── recursos.js         # URLs de logos, video, banner, iconos y redes
    └── components/
        ├── Header.jsx           # Navbar con los 2 logos, colapsable en móvil
        ├── Hero.jsx             # Título, descripción, 3 indicadores y video
        ├── Categorias.jsx       # Franja de categorías con iconos y "Todos"
        ├── Promo.jsx            # Banner mujer, cintillo <marquee> y destacado
        ├── ListaBeneficios.jsx  # Buscador, contador, alertas y grid
        ├── TarjetaBeneficio.jsx # Una tarjeta (imagen, logo, promo, textos)
        ├── ImagenSegura.jsx     # <img> con manejo de error
        └── Footer.jsx           # Enlaces, redes sociales y total cargado
```

---

## 3. Cómo funciona (para explicarlo en la demostración)

### Carga del JSON
En `App.jsx`, un `useEffect` con `[]` corre una sola vez al cargar la página:
```jsx
useEffect(() => {
  async function cargarDatos() {
    try {
      const res = await fetch(import.meta.env.BASE_URL + 'beneficios.json')
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const datos = await res.json()
      setBeneficios(datos)
    } catch (err) {
      setError('No se pudieron cargar los beneficios...')
    } finally {
      setCargando(false)
    }
  }
  cargarDatos()
}, [])
```
Hay tres estados: `beneficios` (los datos), `cargando` (true mientras llega) y `error` (mensaje si falla).

### Generación de tarjetas
`ListaBeneficios` recorre el arreglo con `.map()` y crea un `<TarjetaBeneficio>` por cada registro, usando `key={b.id}`. Ninguna tarjeta está escrita a mano.
```jsx
{visibles.map((b) => <TarjetaBeneficio key={b.id} beneficio={b} />)}
```

### Datos calculados (useMemo)
Todo sale del JSON, no hay cifras copiadas:
- **categorias:** `['Todos', ...new Set(beneficios.map(b => b.categoria))]`
- **indicadores:** total, número de categorías y promociones con `%`
- **destacado:** el beneficio con mayor porcentaje de descuento
- **visibles:** el resultado de aplicar el filtro de categoría y la búsqueda

### Filtro y búsqueda (extras)
- Al hacer clic en una categoría se actualiza el estado `categoria`, y "Todos" muestra todo.
- El input de búsqueda es controlado (`value` + `onChange`) y busca sin importar tildes ni mayúsculas.
- El contador muestra "Mostrando X de 20", es decir, los resultados **visibles**, como pide la prueba.

### Diseño adaptable
- Grid de Bootstrap: `row-cols-1 row-cols-sm-2 row-cols-lg-4` da 1 columna en móvil, 2 en tablet y 4 en escritorio.
- La navbar usa `navbar-expand-lg` y se colapsa en hamburguesa en pantallas pequeñas.
- La franja de categorías tiene `overflow-x: auto`, así que hace scroll horizontal en móvil.
- La sección promo usa `col-12 col-lg-6`: dos columnas en escritorio y apiladas en móvil.
- El video está en `ratio ratio-16x9`.

### Manejo de errores
- **JSON:** `try/catch` más la revisión de `res.ok`. Si falla, sale una alerta roja de Bootstrap.
- **Sin resultados:** una alerta azul cuando el filtro no encuentra nada.
- **Imágenes:** `ImagenSegura` escucha `onError` y, según el modo:
  - `placeholder`: muestra un SVG que dice "Imagen no disponible" (fotos de las tarjetas).
  - `ocultar`: no muestra nada (logos e iconos).
  - `texto`: muestra el nombre en texto (logos del header, redes, banner).
- El logo de "Colchones Selther" viene sin extensión en el JSON. Si no carga, se oculta.

### Accesibilidad
- Botones reales (`<button>`) para las categorías, con `aria-pressed` para indicar la activa.
- `label` asociado al buscador (`htmlFor="busqueda"`).
- `alt` descriptivo en las imágenes de contenido y `alt=""` en las decorativas.
- `aria-live` en el contador y en los indicadores.
- Foco visible en naranja (`:focus-visible`) y un enlace "Saltar al contenido".
- Todo se puede usar con Tab y Enter.

---

## 4. Conceptos de React que se usan

| Concepto | Dónde |
|---|---|
| Componentes funcionales | todos los archivos de `components/` |
| Props | `App` les pasa los datos a cada sección |
| `useState` | beneficios, cargando, error, categoria, texto |
| `useEffect` | fetch del JSON al montar |
| `useMemo` | categorías, indicadores, destacado y filtrados |
| Renderizado de listas | `.map()` con `key` |
| Renderizado condicional | `{error && <div>...}` y operadores ternarios |
| Input controlado | buscador (`value` + `onChange`) |
| Estado local en un componente | `ImagenSegura` (`fallo`) |

Diferencias de JSX con HTML: `className` en lugar de `class`, `htmlFor` en lugar de `for`, `strokeWidth` en lugar de `stroke-width`, `playsInline`, y los estilos se pasan como objeto (`style={{...}}`).

---

## 5. Problemas comunes

| Problema | Solución |
|---|---|
| `npm` no se reconoce | Instala Node.js LTS y reinicia la terminal |
| Pantalla en blanco | Revisa la consola (F12). Casi siempre es un import mal escrito |
| No cargan los beneficios | El JSON debe estar en `public/beneficios.json` |
| La navbar no se abre en móvil | Falta el script `bootstrap.bundle.min.js` en `index.html` |
| Puerto ocupado | Vite usa el siguiente (5174); mira la URL en la terminal |
| No carga una imagen externa | Se muestra el respaldo. Anota cuál falló en el README de entrega |

---

## 6. Antes de entregar
- Renombra la carpeta con tu **nombre y apellido completos**.
- **No entregues `node_modules`** (pesa mucho). Se regenera con `npm install`.
- Muestra la página en escritorio y en móvil (F12 → modo dispositivo, unos 390 px de ancho).
- Explica tres cosas: cómo se carga el JSON (`useEffect` + `fetch`), cómo se generan las tarjetas (`.map`) y cómo se adapta (grid de Bootstrap).
