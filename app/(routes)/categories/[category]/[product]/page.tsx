'use client'
import React from 'react'
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'

import { useQuery } from 'react-query'
import { useParams } from 'next/navigation' // Import useParams for routing if not already imported
import Image from 'next/image'
import TopLoader from '@/app/_components/TopLoader/page'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/app/_redux/slices/cartSlice'
import { toast } from 'react-toastify'

// Define a function to fetch category data based on the category.
const fetchProductData = async (id: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Product = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { product } = params

  // Assuming category is a string

  // Use 'categoryString' in useQuery
  const { data, isLoading, isError } = useQuery(['productData', product], () =>
    fetchProductData(product as string),
  )
  if (isLoading) {
    return <TopLoader />
  }

  const handleAddToCart = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(addToCart({ item: data, quantity: 1 }))
    toast.success('Added to cart')
  }
  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:gap-x-8 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            <Image
              height={100}
              width={100}
              src={data?.image}
              alt={data?.title}
              className="h-full w-1/2 mx-auto object-cover object-center"
            />

            {/* Product info */}
            <div className="">
              {/* Options */}
              <div className="">
                <div className="lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {data?.title}
                  </h1>

                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    ${data?.price}
                  </p>

                  {/* Reviews */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              data?.rating?.rate > rating
                                ? 'text-gray-900'
                                : 'text-gray-200',
                              'h-5 w-5 flex-shrink-0',
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {data?.rating?.rate} out of 5 stars
                      </p>
                      <a
                        href="#"
                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {data?.rating?.count} reviews
                      </a>
                    </div>
                  </div>

                  <form className="mt-10">
                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={handleAddToCart}
                    >
                      Add to bag
                    </button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {data?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Product
