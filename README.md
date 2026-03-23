# Habit Tracker App

Aplicación web básica para registrar hábitos diarios usando HTML, CSS y JavaScript puro, sin frameworks ni backend.

## Estado actual

El proyecto se encuentra en la fase 3. Ya permite:

- escribir el nombre de un hábito
- agregar el hábito desde el formulario
- validar que el nombre no esté vacío
- mostrar cada hábito en una tarjeta
- ver un estado inicial de completado hoy
- mostrar una métrica simple de progreso

## Estructura del proyecto

- `index.html`: estructura principal de la interfaz y contenedor general de la app.
- `css/styles.css`: estilos del layout, formulario, tarjetas, mensajes y diseño responsive.
- `js/app.js`: conexión entre formulario, estado en memoria y renderizado de la lista.
- `js/habits.js`: funciones sencillas para crear hábitos y construir sus tarjetas.
- `js/storage.js`: reservado para la persistencia con `localStorage` en la siguiente fase.
- `js/date-utils.js`: utilidades simples para manejar la fecha actual.

## Cómo abrirlo localmente

1. Descarga o clona este repositorio.
2. Abre el archivo `index.html` directamente en tu navegador.

Si prefieres usar un servidor local simple:

```bash
python3 -m http.server
```

Después abre `http://localhost:8000` en tu navegador.
