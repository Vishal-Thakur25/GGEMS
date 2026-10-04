import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth/session';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin login required' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type (images and common web video formats)
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid file format. Only JPEG, PNG, WEBP, GIF, SVG, and MP4/WEBM videos are accepted.',
        },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB for videos, 10MB for images)
    const isVideo = file.type.startsWith('video/');
    const MAX_SIZE = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the ${isVideo ? '50MB' : '10MB'} maximum limit.`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate safe unique filename
    const ext = path.extname(file.name).toLowerCase() || (isVideo ? '.mp4' : '.jpg');
    const cleanName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .substring(0, 30);
    // Determine target upload directory (team, centers, about, or general)
    const folderParam = formData.get('folder') as string | null;
    const folder =
      folderParam && ['centers', 'team', 'about', 'general', 'ecosystem'].includes(folderParam)
        ? folderParam
        : 'about';
    const uniqueName = `${folder}-${cleanName}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'images', folder);
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const publicUrl = `/images/${folder}/${uniqueName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueName,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
