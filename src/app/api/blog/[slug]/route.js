import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/dbConnect';
import Blog from '../../model/Blog';

export async function GET(req, { params }) {
  await connectToDatabase();   
  const { slug } = params;

  try {

    const blog = await Blog.findOne({ slug: new RegExp(slug, 'i') });
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    const recentPosts = await Blog.aggregate([
      { $match: { slug: { $ne: slug } } }, 
      { $sample: { size: 5 } } 
    ]);

    return NextResponse.json({ ...blog.toObject(), recentPosts }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
