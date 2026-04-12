import { connectToDatabase } from '../lib/dbConnect';
import bcrypt from 'bcryptjs';
import User from '../model/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email, password, username } = await req.json();

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword
    });

    await newUser.save();

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        email: newUser.email
      }
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: 'Failed to create user', error: error.message }, { status: 500 });
  }
}
