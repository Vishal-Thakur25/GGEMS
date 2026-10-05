import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params;
    if (!segments || segments.length === 0) {
      return new NextResponse('Not found', { status: 404 });
    }

    // Prevent directory traversal
    const safeSegments = segments.filter(
      (s) => s && !s.includes('..') && !s.includes('/') && !s.includes('\\')
    );

    const relativePath = safeSegments.join('/');
    
    // Check multiple possible locations for file
    const possiblePaths = [
      path.join(process.cwd(), 'public', 'images', relativePath),
      path.join(process.cwd(), 'public', relativePath),
      path.join(process.cwd(), 'images', relativePath),
      path.join('/var/www/GGEMS/public/images', relativePath),
    ];

    let filePath = '';
    let fileStat = null;

    for (const p of possiblePaths) {
      try {
        const s = await stat(p);
        if (s.isFile()) {
          filePath = p;
          fileStat = s;
          break;
        }
      } catch {}
    }

    if (!filePath || !fileStat) {
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': fileStat.size.toString(),
      },
    });
  } catch (err: any) {
    return new NextResponse('File error', { status: 500 });
  }
}
