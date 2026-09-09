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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Could be id or slug
    const blog = await prisma.blogPost.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ]
      }
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getSessionUser(req);
    if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER'])) {
      return NextResponse.json({ error: 'Unauthorized to update blog post' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const updatedData: any = {};
    if (body.title !== undefined) updatedData.title = body.title;
    if (body.excerpt !== undefined) updatedData.excerpt = body.excerpt;
    if (body.content !== undefined) updatedData.content = body.content;
    if (body.featuredImage !== undefined) updatedData.featuredImage = body.featuredImage;
    if (body.category !== undefined) updatedData.category = body.category;
    if (body.readTime !== undefined) updatedData.readTime = body.readTime;
    if (body.author !== undefined) updatedData.author = body.author;
    if (body.seoTitle !== undefined) updatedData.seoTitle = body.seoTitle;
    if (body.seoDescription !== undefined) updatedData.seoDescription = body.seoDescription;

    if (body.status !== undefined) {
      updatedData.status = body.status;
      if (body.status === 'PUBLISHED' && !existing.publishedAt) {
        updatedData.publishedAt = new Date();
      }
    }

    if (body.slug !== undefined && body.slug !== existing.slug) {
      const newSlug = slugify(body.slug);
      const duplicate = await prisma.blogPost.findFirst({
        where: { slug: newSlug, NOT: { id } }
      });
      if (duplicate) {
        return NextResponse.json({ error: 'A post with this slug already exists.' }, { status: 400 });
      }
      updatedData.slug = newSlug;
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json({ success: true, blog: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getSessionUser(req);
    if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN'])) {
      return NextResponse.json({ error: 'Unauthorized to delete blog post' }, { status: 403 });
    }

    const { id } = await params;

    await prisma.blogPost.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete blog post' }, { status: 500 });
  }
}
