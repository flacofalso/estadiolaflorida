import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Las fechas llegan como "AAAA-MM-DD" desde el panel.
const fecha = z.coerce.date();
// El panel puede guardar campos vacíos como "" o null; se normalizan aquí.
const texto = z.string().trim().nullish().transform((v) => v || undefined);
const youtube = texto;
const lista = <T extends z.ZodTypeAny>(item: T) => z.array(item).nullish().transform((v) => v ?? []);

const eventos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eventos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      fecha,
      hora: texto,
      categoria: z.enum(['Concierto', 'Fútbol', 'Cultura', 'Deporte', 'Municipal']),
      portada: image(),
      resumen: z.string(),
      gratuito: z.boolean().nullish().transform((v) => v ?? true),
      entradas: texto,
      youtube,
      galeria: lista(image()),
      borrador: z.boolean().nullish().transform((v) => v ?? false),
    }),
});

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      fecha,
      portada: image(),
      resumen: z.string(),
      youtube,
      galeria: lista(image()),
      borrador: z.boolean().nullish().transform((v) => v ?? false),
    }),
});

// Textos y fotos de la portada, editables desde el panel.
const sitio = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/sitio' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      bajada: z.string(),
      poster: image(),
      recorrido_titulo: texto.transform((v) => v ?? 'Recorre el estadio'),
      recorrido: z.array(image()).min(4).max(14),
      video_destacado: youtube,
    }),
});

export const collections = { eventos, noticias, sitio };
