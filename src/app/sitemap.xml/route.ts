import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const baseUrl = 'https://omswastikbuildhomes.com';

  // Fetch projects and plots
  const projects = await prisma.project.findMany({
    select: { slug: true, updatedAt: true },
  });

  const plots = await prisma.plot.findMany({
    select: { id: true, updatedAt: true },
    where: { status: 'AVAILABLE' },
  });

  const staticUrls = [
    { url: `${baseUrl}`, lastMod: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastMod: new Date().toISOString() },
    { url: `${baseUrl}/projects`, lastMod: new Date().toISOString() },
    { url: `${baseUrl}/plots`, lastMod: new Date().toISOString() },
    { url: `${baseUrl}/locations/dholera`, lastMod: new Date().toISOString() },
    { url: `${baseUrl}/contact`, lastMod: new Date().toISOString() },
    { url: `${baseUrl}/privacy-policy`, lastMod: new Date().toISOString() },
    { url: `${baseUrl}/disclaimer`, lastMod: new Date().toISOString() },
  ];

  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastMod: p.updatedAt.toISOString(),
  }));

  const plotUrls = plots.map((pl) => ({
    url: `${baseUrl}/plots/${pl.id}`,
    lastMod: pl.updatedAt.toISOString(),
  }));

  const allUrls = [...staticUrls, ...projectUrls, ...plotUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
