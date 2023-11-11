// app/api/create-session/route.js

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request to get the array of products
    const items = await req.json();

    // Map the items to the format expected by Stripe
    const lineItemsT = items.productData.map((item: { priceId: any; quantity: any; }) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    // Create a new checkout session with the array of line items
    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      payment_method_types: ['card'],
      line_items: lineItemsT,
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
      client_reference_id: items.userId,
      customer_email: items.userEmail, // Prefill email
           metadata: {
        address: JSON.stringify(items.shippingAddress),
      }, 
    }); 

    // Convert the response to a NextResponse object
    return new NextResponse(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    // Return a 500 error response
    return new NextResponse(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
