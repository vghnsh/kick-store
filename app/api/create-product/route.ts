// app/api/create-products/route.js

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  // Expecting an array of product items
  const productItems = await req.json();

  try {
    // Create products and prices concurrently using Promise.all
    const createdProducts = await Promise.all(productItems.map(async (item: { name: any; desc: any; image: string; amount: any; quantity: any; }) => {
      // Create a product
      const product = await stripe.products.create({
        name: item.name,
        description: item.desc,
        images: [item.image],
      });

      // Create a price for the product
      const price = await stripe.prices.create({
        unit_amount: item.amount, // Assuming this is already in the smallest currency unit (e.g., cents for USD)
        currency: 'INR',
        product: product.id,
      });

      // Return an object containing the product ID, price ID, and quantity
      return {
        productId: product.id,
        priceId: price.id,
        quantity: item.quantity,
        
      };
    }));

    // Respond with the array of created product information
    return new NextResponse(JSON.stringify(createdProducts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    // Handle errors, e.g., return a 500 response with the error message
    return new NextResponse(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
