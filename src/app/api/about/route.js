import { NextResponse } from 'next/server';
import { connectToDatabase } from '../lib/dbConnect';
import About from '../model/About'; // You need to create this model

export async function GET() {
  await connectToDatabase();
  const about = await About.findOne({});

  // Return the entire about object if found, otherwise return an object with empty strings for all fields
  return NextResponse.json(about || {
    content: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });
}

export async function PUT(req) {
  // Add your admin authorization here if needed
  await connectToDatabase();
  const body = await req.json();
  const about = await About.findOneAndUpdate({}, body, { new: true, upsert: true });
  return NextResponse.json(about);
}