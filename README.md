# Habit Tracker App

Aplicación web básica para registrar hábitos diarios usando HTML, CSS y JavaScript puro, sin frameworks ni backend.

## Estado actual

El proyecto se encuentra en la fase 5. Ya permite:

- escribir el nombre de un hábito
- agregar el hábito desde el formulario
- validar que el nombre no esté vacío
- mostrar cada hábito en una tarjeta
- marcar un hábito como completado hoy
- evitar duplicar la misma fecha en un hábito
- guardar hábitos en `localStorage`
- recuperar hábitos al recargar la página

## Estructura del proyecto

- `index.html`: estructura principal de la interfaz y contenedor general de la app.
- `css/styles.css`: estilos del layout, formulario, tarjetas, botones, mensajes y diseño responsive.
- `js/app.js`: conexión entre formulario, estado en memoria, persistencia y renderizado de la lista.
- `js/habits.js`: funciones sencillas para crear hábitos, revisar si hoy ya fue completado y construir sus tarjetas.
- `js/storage.js`: lectura y escritura de hábitos en `localStorage`.
- `js/date-utils.js`: utilidades simples para manejar la fecha actual.

## Cómo abrirlo localmente

1. Descarga o clona este repositorio.
2. Abre el archivo `index.html` directamente en tu navegador.

Si prefieres usar un servidor local simple:

```bash
python3 -m http.server
```

Después abre `http://localhost:8000` en tu navegador.
