import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/dbConnect';
import Product from '../../model/Product';

export async function GET(req, { params }) {
  await connectToDatabase();
  const { slug } = await params; 

  try {
    const product = await Product.findOne({ slug }).lean();
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Ensure _id is serializable
    const serializedProduct = {
      ...product,
      _id: product._id?.toString() || product._id,
    };

    const relatedProducts = await Product.aggregate([
      { $match: { slug: { $ne: slug } } }, 
      { $sample: { size: 5 } } 
    ]);

    // Serialize aggregation results
    const serializedRelated = relatedProducts.map(item => ({
      ...item,
      _id: item._id?.toString() || item._id,
    }));

    return NextResponse.json({ ...serializedProduct, relatedProducts: serializedRelated }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
