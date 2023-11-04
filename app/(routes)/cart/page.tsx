'use client'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal } from '../../_utility/index'
import {
  addToCart,
  removeFromCart,
  selectCartData,
  removeProductFromCart,
} from '@/app/_redux/slices/cartSlice'
import Image from 'next/image'
import { selectUser } from '@/app/_redux/slices/userSlice'
import { useRouter } from 'next/navigation'

const Cart = () => {
  const router = useRouter()
  const cartData = useSelector(selectCartData)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ item: product, quantity: 1 }))
  }
  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product))
  }
  const handleRemoveProductFromCart = (product: any) => {
    dispatch(removeProductFromCart(product))
  }

  const handleCheckout = () => {
    if (!user) {
      router.push('/login')
    }
  }

  if (cartData?.length === 0) {
    return (
      <div className="bg-white text-center py-8">
        <p className="text-gray-600 bold text-lg">No data found</p>
      </div>
    )
  }
  return (
    <div className="bg-gray-100 py-8 px-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6 text-black">
          Shopping Cart
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full text-black">
                <thead style={{ marginBottom: '2rem' }}>
                  <tr>
                    <th className="text-left font-semibold pb-4">Product</th>
                    <th className="text-left font-semibold ">Name</th>
                    <th className="text-left font-semibold pl-2">Price</th>
                    <th className="text-left font-semibold ">Quantity</th>
                    <th className="text-left font-semibold ">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData?.map((item) => (
                    <tr key={Math.random()}>
                      <td className="py-4 w-1/5">
                        <div className="fl ex items-center h-32 w-32 object-contain">
                          <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            src={item.item.image}
                            alt="Product image"
                            className="mr-1"
                            style={{
                              width: '14rem',
                              height: '95%',
                              objectFit: 'contain',
                            }}
                          />
                        </div>
                      </td>
                      <td className="w-2/5">
                        <span className="font-semibold">{item.item.title}</span>
                      </td>
                      <td className="py-4 pl-2 w-1/5">${item.item.price}</td>
                      <td className="py-4 w-1/5">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleRemoveFromCart(item.item)}
                            className="border rounded-md py-2 px-4 mr-2"
                          >
                            -
                          </button>
                          <span className="text-center w-8">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item.item)}
                            className="border rounded-md py-2 px-4 ml-2"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 pl-2 w-1/5">
                        ${item.item.price * item.quantity}
                      </td>
                      <td
                        className="py-4 pl-8 w-1/5 cursor-pointer"
                        onClick={() => handleRemoveProductFromCart(item.item)}
                      >
                        X
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4 text-black">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>$19.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>$1.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {calculateTotal(cartData)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
