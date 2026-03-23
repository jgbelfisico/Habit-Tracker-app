# Habit Tracker App

Aplicación web básica para registrar hábitos diarios usando HTML, CSS y JavaScript puro, sin frameworks ni backend.

## Estado actual

La aplicación ya permite:

- crear hábitos
- editar el nombre de un hábito existente
- eliminar hábitos
- marcar un hábito como completado hoy
- evitar duplicar la misma fecha en un hábito
- guardar hábitos en `localStorage`
- recuperar hábitos al recargar la página
- filtrar hábitos por todos, completados hoy o pendientes hoy
- mostrar una racha real de días consecutivos
- mostrar un historial simple de fechas completadas
- cambiar entre modo claro y oscuro

## Estructura del proyecto

- `index.html`: estructura principal de la interfaz, formulario, filtros, lista y botón de tema.
- `css/styles.css`: estilos del layout, responsive básico, tarjetas, acciones, filtros y modo oscuro.
- `js/app.js`: coordinación de eventos, renderizado, edición, eliminación, filtros y tema.
- `js/habits.js`: lógica de hábitos, racha actual, historial y renderizado de tarjetas.
- `js/storage.js`: persistencia de hábitos y del tema en `localStorage`.
- `js/date-utils.js`: utilidades simples para manejar fechas.

## Cómo abrirlo localmente

1. Descarga o clona este repositorio.
2. Abre el archivo `index.html` directamente en tu navegador.

Si prefieres usar un servidor local simple:

```bash
python3 -m http.server
```

Después abre `http://localhost:8000` en tu navegador.
