import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { randomBytes } from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const options = {
      amount,
      currency: 'INR',
      receipt: `receipt_order_${randomBytes(4).toString('hex')}`,
    };

    const order = await razorpay.orders.create(options);
    
    if (!order) {
        return NextResponse.json({ error: 'Could not create order' }, { status: 500 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Razorpay API Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
