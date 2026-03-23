import { connectToDatabase } from '../lib/dbConnect';
import { authorize } from '../lib/auth';
import Blog from '../model/Blog';
import { parse } from 'url';
import { parse as parseQuery } from 'querystring';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: true, 
  },
};

export async function GET(req) {

 try {
    await connectToDatabase();
    const { query } = parse(req.url);
    const { id, all } = parseQuery(query);

    if (id) {
      const blog = await Blog.findById(id);
      return NextResponse.json(blog);
    } else if (all === 'true') {
      const blogs = await Blog.find({}).sort({ _id: -1 });
      return NextResponse.json(blogs);
    } else {
      return NextResponse.json({ message: 'Invalid query parameters' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req) {
  if (!authorize(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const body = await req.json();

  const blog = new Blog(body);
  const result = await blog.save();
  return NextResponse.json({ message: `Blog ${body.name} created!`, id: result._id }, { status: 201 });
}

export async function PUT(req) {
  if (!authorize(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const { query } = parse(req.url);
  const { id } = parseQuery(query);
  const body = await req.json();

  await Blog.findByIdAndUpdate(id, body);
  return NextResponse.json({ message: `Blog ${id} updated!` }, { status: 200 });
}

export async function DELETE(req) {
  if (!authorize(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const { query } = parse(req.url);
  const { id } = parseQuery(query);
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ message: `Blog ${id} deleted!` });
}