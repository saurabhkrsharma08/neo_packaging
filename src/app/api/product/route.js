import { connectToDatabase } from '../lib/dbConnect';
import { authorize } from '../lib/auth';
import Product from '../model/Product';
import { parse } from 'url';
import { parse as parseQuery } from 'querystring';

export const config = {
  api: {
    bodyParser: true, 
  },
};

export async function GET(req) {
  await connectToDatabase();
  const { query } = parse(req.url);
  const { id, all } = parseQuery(query);

  if (id) {
    const product = await Product.findById(id);
    return new Response(JSON.stringify(product));
  } else if (all === 'true') {
    const products = await Product.find({}).sort({ priority: 1, createdAt: 1 }).exec();
    return new Response(JSON.stringify(products));
  } else {
    return new Response(JSON.stringify({ message: 'Invalid query parameters' }), { status: 400 });
  }
}

export async function POST(req) {
  if (!authorize(req)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectToDatabase();
  const body = await req.json();

  const product = new Product(body);
  const result = await product.save();
  return new Response(JSON.stringify({ message: `Product ${body.name} created!`, id: result._id }), { status: 201 });
}

export async function PUT(req) {
  if (!authorize(req)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectToDatabase();
  const { query } = parse(req.url);
  const { id } = parseQuery(query);
  const body = await req.json();

  await Product.findByIdAndUpdate(id, body);
  return new Response(JSON.stringify({ message: `Product ${id} updated!` }), { status: 200 });
}

export async function DELETE(req) {
  if (!authorize(req)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectToDatabase();
  const { query } = parse(req.url);
  const { id } = parseQuery(query);
  await Product.findByIdAndDelete(id);
  return new Response(JSON.stringify({ message: `Product ${id} deleted!` }), { status: 200 });
}