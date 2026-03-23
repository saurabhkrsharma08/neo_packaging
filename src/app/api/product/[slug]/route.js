import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/dbConnect';
import Product from '../../model/Product';

export async function GET(req, { params }) {
  await connectToDatabase();
  const { slug } = params; 

  try {
    const product = await Product.findOne({ slug });
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const relatedProducts = await Product.aggregate([
      { $match: { slug: { $ne: slug } } }, 
      { $sample: { size: 5 } } 
    ]);

    return NextResponse.json({ ...product.toObject(), relatedProducts }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
