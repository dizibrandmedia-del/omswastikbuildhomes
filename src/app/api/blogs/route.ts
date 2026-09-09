import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, hasPermission } from '@/lib/auth';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;

    const where: any = all ? {} : { status: 'PUBLISHED' };
    if (category && category !== 'All') {
      where.category = category;
    }

    const blogs = await prisma.blogPost.findMany({
      where,
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit,
    });

    return NextResponse.json({ blogs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getSessionUser(req);
    if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER'])) {
      return NextResponse.json({ error: 'Unauthorized to create blog posts' }, { status: 403 });
    }

    const body = await req.json();
    const { title, slug, featuredImage, excerpt, content, category, readTime, author, status, seoTitle, seoDescription } = body;

    if (!title || !content || !excerpt) {
      return NextResponse.json({ error: 'Title, excerpt, and content are required.' }, { status: 400 });
    }

    let finalSlug = slug ? slugify(slug) : slugify(title);
    // Check if slug exists
    const existing = await prisma.blogPost.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newBlog = await prisma.blogPost.create({
      data: {
        title,
        slug: finalSlug,
        featuredImage: featuredImage || '/images/hero-dholera.jpg',
        excerpt,
        content,
        author: author || 'Om Swastik Research Team',
        category: category || 'Investment Insights',
        readTime: readTime || '5 min read',
        status: status || 'PUBLISHED',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt,
      }
    });

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create blog post' }, { status: 500 });
  }
}
