import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image'); 

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName =`${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({ message: 'File uploaded successfully', imageUrl: `/uploads/${fileName}` });
  } catch (error) {
    return NextResponse.json({ message: 'Upload failed', error: error.message }, { status: 500 });
  }
}

export const config = {
  api: { bodyParser: false }, 
};
