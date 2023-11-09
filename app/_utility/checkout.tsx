import { loadStripe } from '@stripe/stripe-js'

const handleCheckout = async ({ stripe, lineItems }) => {
  try {
    // Assuming you have a type for your product
    type Product = {
      name: string
      description: string
      price: number
    }

    const response = await fetch('/api/create-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lineItems),
    })

    const productData = await response.json()

    const sessionResponse = await fetch('/api/checkout-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })

    const { sessionId } = await sessionResponse.json()

    // Redirect to Stripe Checkout
    stripe?.redirectToCheckout({ sessionId })
  } catch (error) {
    console.error(error)
  }
}

const checkout = async ({ lineItems }) => {
  let stripePromise = null
  const getstripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise
  }
  const stripe = await getstripe()

  await handleCheckout({ stripe, lineItems })
  // await stripe.redirectToCheckout({
  //   mode: 'payment',
  //   lineItems: [
  //     {
  //       price_data: {
  //         currency: 'usd',
  //         product_data: {
  //           name: 'abc',
  //         },
  //         unit_amount: '12',
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
  //   cancelUrl: window.location.origin,
  // })

  // In your React component or client-side code

  // Render a button that calls handleCheckout when clicked
}
export { checkout, handleCheckout }
