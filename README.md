# Arena La Florida

Sitio web del **Estadio Bicentenario Municipal de La Florida**. Es un sitio estático hecho con [Astro](https://astro.build). Las noticias y los eventos se administran desde [Pages CMS](https://pagescms.org).

- Sin servidor, base de datos ni login público: casi no hay superficie de ataque.
- Las fotos se suben en buena resolución y el sitio genera versiones livianas (WebP) para cada pantalla.
- Los videos se insertan desde YouTube en modo `youtube-nocookie`, y el reproductor solo se carga cuando alguien hace clic.

---

## Estructura

```
.pages.yml                  Configuración del panel (campos de noticias, eventos y portada)
.github/workflows/          Publicación automática en GitHub Pages
public/video/               Clip del hero (hero.mp4, hero.webm, hero-movil.mp4)
src/
  assets/logo/              Logos del estadio (blanco, negro, color y color para fondo oscuro)
  assets/fotos/             Todas las fotos (las sube el panel)
    recorrido/              Fotos del recorrido con scroll de la portada
    portada/                Foto de respaldo del video
    eventos/  noticias/     Portadas y galerías
  content/
    eventos/                Un archivo .md por evento
    noticias/               Un archivo .md por noticia
    sitio/inicio.yml        Textos y fotos de la portada
  components/               Hero, Recorrido, Galería, YouTube, tarjetas, encabezado y pie
  pages/                    Inicio, El Estadio, Eventos, Noticias, Visítanos
```

## Trabajar en tu computador

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev        # sitio de prueba en http://localhost:4321
npm run build      # genera la versión final en dist/
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube este proyecto a la rama `main`.
2. En el repositorio, ve a **Settings → Pages** y en **Source** elige **GitHub Actions**.
3. Cada cambio en `main` publica el sitio automáticamente. Esto incluye lo que guardes desde el panel.
4. Además, el sitio se vuelve a publicar todos los días de madrugada. Así los eventos pasan solos de "Próximos" a "Realizados".

**Dominio propio** (por ejemplo `arenalaflorida.cl` o un subdominio de `laflorida.cl`): agrégalo en **Settings → Pages → Custom domain** y crea el registro DNS que GitHub indica. No hay que cambiar nada en el código.

> Alternativa: Cloudflare Pages también sirve. Usa el comando de build `npm run build` y la carpeta de salida `dist`.

## Panel de noticias (Pages CMS)

1. Entra a <https://app.pagescms.org> con tu cuenta de GitHub.
2. Autoriza el acceso al repositorio del sitio.
3. Verás tres secciones: **Noticias**, **Eventos** y **Portada**.

Al guardar, Pages CMS hace un commit en el repositorio y el sitio se publica solo en uno o dos minutos. El campo **Guardar como borrador** permite dejar una nota lista sin publicarla.

## Guía de fotos

| Uso | Tamaño recomendado al subir | Cómo se muestra |
|---|---|---|
| Recorrido de la portada (4 a 14 fotos) | 1.200 a 1.600 px de lado largo | Calidad media; pasan rápido al hacer scroll |
| Portada de evento o noticia | 2.000 a 2.500 px de ancho, horizontal | Hasta 2.000 px |
| Galería de evento | La mejor disponible, idealmente 2.500 a 4.000 px | Mosaico liviano y pantalla completa hasta 2.560 px con poca compresión |

- Formatos: JPG, PNG o WebP. Exporta en JPG calidad 85 a 90; más que eso no se nota y pesa el doble.
- Evita subir archivos de más de 10 MB. GitHub recomienda repositorios livianos, y las galerías van sumando.
- Si con el tiempo el repositorio supera ~1 GB, las galerías se pueden mover a un almacenamiento externo (por ejemplo, Cloudflare R2) sin rehacer el sitio.

## Clip del hero

El hero muestra la foto de respaldo apenas abre la página y carga el clip **después** de que todo lo demás terminó. El clip no se carga si el visitante tiene activado "ahorro de datos" o "reducir movimiento".

Deja estos archivos en `public/video/` (solo `hero.mp4` es obligatorio):

```bash
# Escritorio, MP4 (meta: 3 a 6 MB para 10 a 15 segundos)
ffmpeg -i original.mp4 -t 15 -an -vf "scale=1920:-2,fps=30" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart public/video/hero.mp4

# Escritorio, WebM (más liviano en Chrome y Firefox)
ffmpeg -i original.mp4 -t 15 -an -vf "scale=1920:-2,fps=30" \
  -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 public/video/hero.webm

# Celulares: recorte vertical y más liviano (meta: 1 a 2 MB)
ffmpeg -i original.mp4 -t 15 -an -vf "crop=ih*9/16:ih,scale=720:-2,fps=30" \
  -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart public/video/hero-movil.mp4
```

Recomendaciones: el clip va sin audio y debe funcionar en loop (que el final empalme con el inicio). Planos amplios y lentos (dron, público, luces) se ven mejor detrás del texto.

## Videos de YouTube

En cualquier evento o noticia, pega el enlace del video en el campo **Video de YouTube**. Sirven enlaces normales, cortos (`youtu.be`), de Shorts o de transmisiones en vivo. El sitio muestra la miniatura y carga el reproductor desde `youtube-nocookie.com` recién cuando el visitante hace clic.

## Antes de lanzar

- [ ] Reemplazar las fotos de ejemplo (todas dicen "FOTO DE EJEMPLO").
- [ ] Borrar los eventos y noticias de ejemplo en `src/content/`.
- [ ] Completar los datos de **El Estadio** (`src/pages/el-estadio.astro`): capacidad, inauguración, cancha, pista e historia.
- [ ] Completar **Visítanos** (`src/pages/visitanos.astro`) y el pie (`src/components/Footer.astro`): dirección, transporte, horarios, reglamento y contacto.
- [ ] Agregar el clip del hero en `public/video/`.
- [ ] Revisar con el municipio el uso de `logo-color-fondo-oscuro.png`. Es una variante del logo a color con el gris cambiado a blanco para que se lea sobre fondo oscuro.
