import type { APIRoute } from 'astro';

const pages = [
  { path: '', priority: '1.0' },
  { path: '/privacy', priority: '0.3' },
  { path: '/terms', priority: '0.3' },
];

const baseUrl = 'https://www.rustilian.com';

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => {
    const englishUrl = `${baseUrl}${page.path}`;
    const ptBrUrl = `${baseUrl}/pt-br${page.path}`;

    return `  <url>
    <loc>${englishUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${englishUrl}"/>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${ptBrUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${englishUrl}"/>
  </url>
  <url>
    <loc>${ptBrUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${englishUrl}"/>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${ptBrUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${englishUrl}"/>
  </url>`;
  }).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
