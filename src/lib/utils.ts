// Utilidades compartidas

/** Antepone la ruta base del sitio (necesaria si se publica en usuario.github.io/repositorio). */
export function url(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

const TZ = 'UTC'; // las fechas se guardan sin hora; se formatean en UTC para no correr el día

export function fechaLarga(d: Date) {
  return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ }).format(d);
}
export function dia(d: Date) {
  return new Intl.DateTimeFormat('es-CL', { day: '2-digit', timeZone: TZ }).format(d);
}
export function mes(d: Date) {
  return new Intl.DateTimeFormat('es-CL', { month: 'short', timeZone: TZ }).format(d).replace('.', '');
}
export function diaSemana(d: Date) {
  return new Intl.DateTimeFormat('es-CL', { weekday: 'long', timeZone: TZ }).format(d);
}

/** Hoy en Santiago como "AAAA-MM-DD" (para separar eventos próximos de pasados al compilar). */
export function hoySantiago() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date());
}
export function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Extrae el ID de un video de YouTube desde una URL o un ID suelto. */
export function youtubeId(value?: string) {
  if (!value) return undefined;
  const v = value.trim();
  if (/^[\w-]{11}$/.test(v)) return v;
  const m = v.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m?.[1];
}

/** Color de la fachada del logo, rotando por índice. */
export const COLORES = ['amarillo', 'terracota', 'verde', 'azul'] as const;
export const colorPorCategoria: Record<string, (typeof COLORES)[number]> = {
  Concierto: 'terracota',
  Fútbol: 'verde',
  Deporte: 'verde',
  Cultura: 'amarillo',
  Municipal: 'azul',
};
