import TarjetaBeneficio from './TarjetaBeneficio.jsx'

export default function ListaBeneficios({ visibles, total, cargando, error, texto, onBuscar }) {
  let contador = `Mostrando ${visibles.length} de ${total} beneficios`
  if (cargando) contador = 'Cargando beneficios...'
  if (error) contador = 'No se pudieron cargar los beneficios.'

  return (
    <section id="beneficios" className="beneficios py-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
          <div>
            <h2 className="h3 mb-1">Beneficios</h2>
            <p className="mb-0 text-muted" role="status" aria-live="polite">{contador}</p>
          </div>
          <div className="buscador">
            <label htmlFor="busqueda" className="form-label mb-1">Buscar comercio</label>
            <input
              type="search"
              id="busqueda"
              className="form-control"
              placeholder="Nombre, categoría o promoción"
              autoComplete="off"
              value={texto}
              onChange={(e) => onBuscar(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        {!cargando && !error && visibles.length === 0 && (
          <div className="alert alert-info" role="status">No se encontraron beneficios con ese criterio.</div>
        )}

        {/* 1 columna en móvil, 2 en tablet, 4 en escritorio */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {visibles.map((b) => <TarjetaBeneficio key={b.id} beneficio={b} />)}
        </div>
      </div>
    </section>
  )
}
