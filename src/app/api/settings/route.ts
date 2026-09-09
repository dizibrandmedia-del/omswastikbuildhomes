import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser, hasPermission } from '@/lib/auth';

export async function GET() {
  const setting = await prisma.contactSetting.findUnique({
    where: { id: 'default' },
  });
  return NextResponse.json({ setting });
}

export async function POST(req: NextRequest) {
  const session = getSessionUser(req);
  if (!session || !hasPermission(session.role, ['SUPER_ADMIN', 'ADMIN'])) {
    return NextResponse.json({ error: 'Unauthorized to update settings.' }, { status: 403 });
  }

  const body = await req.json();

  const updated = await prisma.contactSetting.upsert({
    where: { id: 'default' },
    update: body,
    create: {
      id: 'default',
      ...body,
    },
  });

  return NextResponse.json({ success: true, setting: updated });
}
