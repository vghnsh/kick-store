import { loadStripe } from '@stripe/stripe-js'
import { Stripe } from '@stripe/stripe-js'

// Define the type for your product
type Product = {
  name: string
  description: string
  price: number
}

// Define the type for the checkout function
type CheckoutParamsNew = {
  stripe: Stripe | null
  lineItems: Product[]
  userId: number
  userName: string
  shippingAddress: string
  userEmail: string
  cart: Array<any>
}

// Define the handleCheckout function
const handleCheckout = async ({
  stripe,
  lineItems,
  userId,
  userName,
  shippingAddress,
  userEmail,
  cart,
}: CheckoutParamsNew): Promise<void> => {
  try {
    // Assuming you have a type for your product
    const response = await fetch('/api/create-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lineItems),
    })

    const productData: Product[] = await response.json()

    const sessionResponse = await fetch('/api/checkout-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productData,
        userId,
        userEmail,
        userName,
        shippingAddress,
        cart,
      }),
    })

    const { sessionId } = await sessionResponse.json()

    // Redirect to Stripe Checkout
    stripe?.redirectToCheckout({ sessionId })
  } catch (error) {
    console.error(error)
  }
}

type CheckoutParams = {
  lineItems: any
  userId: number
  userName: string
  shippingAddress: string
  userEmail: string
  cart: Array<any>
}

const checkout = async ({
  lineItems,
  userId,
  userName,
  shippingAddress,
  userEmail,
  cart,
}: CheckoutParams) => {
  let stripePromise: Promise<Stripe | null> | null = null

  const getStripe = (): Promise<Stripe | null> => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      )
    }
    return stripePromise
  }

  const stripe = await getStripe()

  await handleCheckout({
    stripe,
    lineItems,
    userId,
    userName,
    userEmail,
    shippingAddress,
    cart,
  })
}

export default checkout

export { checkout, handleCheckout }
