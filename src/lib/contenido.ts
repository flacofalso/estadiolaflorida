import { getCollection } from 'astro:content';
import { hoySantiago, iso } from './utils';

/** Eventos publicados, separados en próximos (orden ascendente) y pasados (descendente). */
export async function eventosOrdenados() {
  const todos = await getCollection('eventos', ({ data }) => !data.borrador);
  const hoy = hoySantiago();
  const proximos = todos.filter((e) => iso(e.data.fecha) >= hoy).sort((a, b) => +a.data.fecha - +b.data.fecha);
  const pasados = todos.filter((e) => iso(e.data.fecha) < hoy).sort((a, b) => +b.data.fecha - +a.data.fecha);
  return { proximos, pasados };
}

export async function noticiasOrdenadas() {
  const todas = await getCollection('noticias', ({ data }) => !data.borrador);
  return todas.sort((a, b) => +b.data.fecha - +a.data.fecha);
}
