import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, hasPermission } from '@/lib/auth';

function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getSessionUser(req);
    if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER'])) {
      return NextResponse.json({ error: 'Unauthorized to update videos' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    const existing = await prisma.video.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const updatedData: any = {};
    if (body.title !== undefined) updatedData.title = body.title;
    if (body.description !== undefined) updatedData.description = body.description;
    if (body.category !== undefined) updatedData.category = body.category;
    if (body.displayOrder !== undefined) updatedData.displayOrder = parseInt(body.displayOrder, 10);
    if (body.isActive !== undefined) updatedData.isActive = Boolean(body.isActive);

    if (body.videoUrl !== undefined) {
      updatedData.videoUrl = body.videoUrl;
      const yId = extractYoutubeId(body.videoUrl);
      updatedData.youtubeId = yId;
      if (!body.thumbnailUrl && yId) {
        updatedData.thumbnailUrl = `https://img.youtube.com/vi/${yId}/hqdefault.jpg`;
      }
    }
    if (body.thumbnailUrl !== undefined) {
      updatedData.thumbnailUrl = body.thumbnailUrl;
    }

    const updated = await prisma.video.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json({ success: true, video: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update video' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getSessionUser(req);
    if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN'])) {
      return NextResponse.json({ error: 'Unauthorized to delete videos' }, { status: 403 });
    }

    const { id } = await params;

    await prisma.video.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Video deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete video' }, { status: 500 });
  }
}
