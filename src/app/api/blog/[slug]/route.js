import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/dbConnect';
import Blog from '../../model/Blog';

export async function GET(req, { params }) {
  await connectToDatabase();   
  const { slug } = await params;

  try {

    const blog = await Blog.findOne({ slug: new RegExp(slug, 'i') }).lean();
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Ensure _id is serializable
    const serializedBlog = {
      ...blog,
      _id: blog._id?.toString() || blog._id,
    };

    const recentPosts = await Blog.aggregate([
      { $match: { slug: { $ne: slug } } }, 
      { $sample: { size: 5 } } 
    ]);

    // Serialize aggregation results
    const serializedRecent = recentPosts.map(item => ({
      ...item,
      _id: item._id?.toString() || item._id,
    }));

    return NextResponse.json({ ...serializedBlog, recentPosts: serializedRecent }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
