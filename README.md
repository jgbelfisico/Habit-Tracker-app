# Habit Tracker App

Aplicación web básica para registrar hábitos diarios usando HTML, CSS y JavaScript puro, sin frameworks ni backend.

## Estado actual

El proyecto se encuentra en una fase inicial de interfaz visual. Ya incluye:

- encabezado principal
- formulario base para escribir un hábito
- tarjetas visuales para mostrar hábitos
- indicador visual de completado hoy
- espacio para mostrar progreso y racha simple

## Estructura del proyecto

- `index.html`: estructura principal de la interfaz y contenedor general de la app.
- `css/styles.css`: estilos del layout, responsive básico y apariencia de tarjetas, formulario y métricas.
- `js/app.js`: renderizado visual inicial de hábitos de ejemplo para mostrar la estructura en pantalla.
- `js/habits.js`: reservado para la lógica de hábitos en próximas fases.
- `js/storage.js`: reservado para la persistencia con `localStorage`.
- `js/date-utils.js`: reservado para utilidades de fecha.

## Cómo abrirlo localmente

1. Descarga o clona este repositorio.
2. Abre el archivo `index.html` directamente en tu navegador.

Si prefieres usar un servidor local simple:

```bash
python3 -m http.server
```

Después abre `http://localhost:8000` en tu navegador.
