// src/app/api/product/reorder/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../api/lib/dbConnect';
import Product from '../../../api/model/Product';

export async function PUT(request) {

  await connectToDatabase();

  try {
    const { updates } = await request.json();

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json({ message: 'Invalid or empty updates array provided.' }, { status: 400 });
    }

    const bulkOperations = updates.map(update => ({
      updateOne: {
        filter: { _id: update.id },
        update: { $set: { priority: update.priority } },
      },
    }));

    const result = await Product.bulkWrite(bulkOperations);

    return NextResponse.json({
      message: 'Product priorities updated successfully!',
      modifiedCount: result.modifiedCount
    }, { status: 200 });

  } catch (error) {
    console.error('Error reordering products:', error);
    return NextResponse.json({ message: 'Failed to reorder products.', error: error.message }, { status: 500 });
  }
}