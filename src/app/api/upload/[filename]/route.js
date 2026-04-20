import { readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req, { params }) {
  try {
    const { filename } = params;

    if (!filename) {
      return new NextResponse('Filename is required', { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public/uploads', filename);

    // Read file
    const fileBuffer = await readFile(filePath);

    // Get file extension
    const ext = filename.split('.').pop()?.toLowerCase();

    // Manual MIME type mapping
    const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      svg: 'image/svg+xml',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error) {
    console.error('File fetch error:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}