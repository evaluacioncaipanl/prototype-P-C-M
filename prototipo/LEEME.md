# Prototipo · Plataforma de Capacitación CAIPA

Prototipo navegable (escritorio y celular) que reconstruye y mejora el de Claude Chat.

## Archivos (se editan por separado)

| Archivo | Qué contiene | Equivale después a… |
|---|---|---|
| `contenido.js` | Módulos, lecciones, pantallas, línea del tiempo, preguntas, áreas | Hojas de Google Sheets |
| `app.js` | Reglas (desbloqueo, intentos, 85 mínimo) y pantallas | Apps Script (`Code.gs` + plantilla HTML) |
| `estilos.css` | Colores, tipografía y diseño | CSS dentro de la plantilla |
| `img/` | Fotos e imágenes | Carpeta de Drive o GitHub |

## Ver el prototipo
En la app de Claude se abre solo. A mano:
```
powershell -ExecutionPolicy Bypass -File servidor.ps1
```
y abre http://localhost:8080

## Constancia
Se activa al concluir la capacitación general (botón en Inicio, en el menú y al terminar el último módulo).
"Descargar PDF" abre la ventana de impresión del navegador: elegir **Guardar como PDF**.
Los logos y la firma son espacios marcados; en la versión real la genera Apps Script.

## Agregar imágenes
1. Guarda la imagen en `prototipo/img/` (por ejemplo `img/hitos/2014.jpg`).
2. En `contenido.js`, escribe la ruta en el bloque `IMG('img/…', 'descripción')` o en el campo `img:` de un hito de la línea del tiempo.
