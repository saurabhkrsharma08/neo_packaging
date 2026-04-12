import { NextResponse } from 'next/server';
import { connectToDatabase } from '../lib/dbConnect';
import ProductDescription from '../model/ProductDescription';

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function GET() {
  await connectToDatabase();
  const productDescription = await ProductDescription.findOne({}).lean();

  return NextResponse.json({
    description: productDescription?.description || '',
    title: productDescription?.title || ''
  });
}

export async function PUT(req) {
  const body = await req.json();
  await connectToDatabase();

  const updated = await ProductDescription.findOneAndUpdate(
    {},
    {
      title: body.title || '',
      description: body.description || '',
    },
    { upsert: true, new: true }
  ).lean();

  return NextResponse.json(updated);
}
