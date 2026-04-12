import { connectToDatabase } from '../lib/dbConnect';
import { authorize } from '../lib/auth';
import Category from '../model/Category';
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
      const category = await Category.findById(id);
      return NextResponse.json(category || null, { status: category ? 200 : 404 });
    }

    if (all === 'true') {
      const categories = await Category.find({}).sort({ name: 1 }).exec();
      return NextResponse.json(categories);
    }

    return NextResponse.json({ message: 'Invalid query parameters' }, { status: 400 });
  } catch (error) {
    console.error('Category API GET error:', error);
    return NextResponse.json({ message: 'Failed to load categories', error: error?.message ?? 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req) {
  if (!authorize(req)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectToDatabase();
  const body = await req.json();

  if (!body.name) {
    return new Response(JSON.stringify({ message: 'Category name is required' }), { status: 400 });
  }

  const category = new Category({
    name: body.name,
    description: body.description || '',
  });

  await category.save();
  return new Response(JSON.stringify({ message: `Category ${body.name} created!`, id: category._id }), { status: 201 });
}

export async function PUT(req) {
  if (!authorize(req)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectToDatabase();
  const { query } = parse(req.url);
  const { id } = parseQuery(query);
  const body = await req.json();

  if (!id) {
    return new Response(JSON.stringify({ message: 'Category id is required' }), { status: 400 });
  }

  await Category.findByIdAndUpdate(id, {
    name: body.name,
    description: body.description || '',
  });

  return new Response(JSON.stringify({ message: `Category ${id} updated!` }), { status: 200 });
}

export async function DELETE(req) {
  if (!authorize(req)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectToDatabase();
  const { query } = parse(req.url);
  const { id } = parseQuery(query);

  if (!id) {
    return new Response(JSON.stringify({ message: 'Category id is required' }), { status: 400 });
  }

  await Category.findByIdAndDelete(id);
  return new Response(JSON.stringify({ message: `Category ${id} deleted!` }), { status: 200 });
}
