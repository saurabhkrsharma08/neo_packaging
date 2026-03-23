import { connectToDatabase } from '../lib/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User';

export async function POST(req) {
  await connectToDatabase();

  const { email, password } = await req.json();

  const saltRounds = 10;
  const encPassword = await bcrypt.hash(password, saltRounds);
  console.log(encPassword);

  const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: 'Invalid password' }), { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

  return new Response(JSON.stringify({ token, message: `Login successful for ${user.username}` }), { status: 200 });
}