import { NextResponse } from 'next/server';

export async function GET() {
  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://omswastikbuildhomes.com/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
