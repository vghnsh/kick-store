
import { headers } from 'next/headers'
import { db } from '@/app/_firebase/config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server'

const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY)

const secret = process.env.NEXT_PAYMENT_WEBHOOK || ''

export async function POST(req: Request) {
  try {
    const body = await req.text()

    const signature = headers().get('stripe-signature')

    const event = stripe.webhooks.constructEvent(body, signature, secret)

    if (event.type === 'checkout.session.completed') {
      const checkoutSessionAsyncPaymentSucceeded = event.data.object
      const userSnapshot1 = await getDoc(doc(db, 'users', checkoutSessionAsyncPaymentSucceeded.client_reference_id))
      console.log(userSnapshot1)
      if (!userSnapshot1.exists) {
        // If the user does not exist, create a new user document
        await setDoc(doc(db, 'users', checkoutSessionAsyncPaymentSucceeded.client_reference_id), {
          uname: 'Test',
          address: 'Test',
        })
      }

      // Create an order document
      const orderDocRef1 = doc(
        db,
        'users',
        checkoutSessionAsyncPaymentSucceeded.client_reference_id,
        'orders',
        checkoutSessionAsyncPaymentSucceeded.id
        ) // Add a specific document ID here
      setDoc(orderDocRef1, {
        amount: checkoutSessionAsyncPaymentSucceeded.amount_total,
        cart: checkoutSessionAsyncPaymentSucceeded.metadata,
        time: checkoutSessionAsyncPaymentSucceeded.created,
        data:checkoutSessionAsyncPaymentSucceeded
      })
    }
    return NextResponse.json({ result: event, ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: 'something went wrong',
        ok: false,
      },
      { status: 500 },
    )
  }
}
