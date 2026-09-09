import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, hasPermission } from '@/lib/auth';

function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    const where = all ? {} : { isActive: true };

    const videos = await prisma.video.findMany({
      where,
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({ videos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getSessionUser(req);
    if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER'])) {
      return NextResponse.json({ error: 'Unauthorized to add videos' }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, videoUrl, thumbnailUrl, category, displayOrder, isActive } = body;

    if (!title || !videoUrl) {
      return NextResponse.json({ error: 'Title and Video URL are required.' }, { status: 400 });
    }

    const youtubeId = extractYoutubeId(videoUrl);
    const derivedThumbnail = thumbnailUrl || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '/images/hero-dholera.jpg');

    const newVideo = await prisma.video.create({
      data: {
        title,
        description: description || null,
        videoUrl,
        youtubeId,
        thumbnailUrl: derivedThumbnail,
        category: category || 'Site Tour',
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) : 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      }
    });

    return NextResponse.json({ success: true, video: newVideo }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create video' }, { status: 500 });
  }
}
