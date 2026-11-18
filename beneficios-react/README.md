# Beneficios Caja de ANDE - Prueba técnica (React)

Página de beneficios comerciales hecha con React + Vite, Bootstrap 5 y `fetch` de `public/beneficios.json`.

## Ejecutar
```bash
npm install
npm run dev
```
Abrir http://localhost:5173

## Resumen
- `App.jsx` lee el JSON con `useEffect` + `fetch` y maneja errores con `try/catch`.
- Las 20 tarjetas se generan con `.map()`, sin escribirlas a mano.
- Filtro por categoría ("Todos" incluido) y búsqueda; el contador muestra los resultados visibles.
- Adaptable: 4 tarjetas por fila en escritorio y 1 en móvil, navbar colapsable y bloques apilados.
- Imágenes fallidas con respaldo, controles accesibles con teclado.

Detalle completo y setup en `SETUP.md`.
