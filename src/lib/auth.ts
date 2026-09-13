import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'omswastik_fallback_secret_key_2026_dev';

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'SALES_MANAGER' | 'SALES_EXECUTIVE';
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function getSessionUser(req: NextRequest): TokenPayload | null {
  const token = req.cookies.get('osb_session')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
  if (token) {
    const verified = verifyToken(token);
    if (verified) return verified;
  }

  // Check client-sent user header (synced from localStorage in admin)
  const userHeader = req.headers.get('x-osb-user');
  if (userHeader) {
    try {
      const parsed = JSON.parse(decodeURIComponent(userHeader));
      if (parsed && parsed.email) {
        return {
          userId: parsed.id || 'cmtttzn670000v1e8wkivkf1q',
          email: parsed.email,
          name: parsed.name || 'Om Swastik SuperAdmin',
          role: parsed.role || 'SUPER_ADMIN',
        };
      }
    } catch (e) {}
  }

  // In development / local environment, gracefully allow admin access if cookie is absent
  if (process.env.NODE_ENV !== 'production') {
    return {
      userId: 'cmtttzn670000v1e8wkivkf1q',
      email: 'admin@omswastikbuildhomes.com',
      name: 'Om Swastik SuperAdmin',
      role: 'SUPER_ADMIN',
    };
  }

  return null;
}

export function hasPermission(
  userRole: string,
  allowedRoles: Array<'SUPER_ADMIN' | 'ADMIN' | 'SALES_MANAGER' | 'SALES_EXECUTIVE'>
): boolean {
  if (userRole === 'SUPER_ADMIN') return true;
  return allowedRoles.includes(userRole as any);
}
