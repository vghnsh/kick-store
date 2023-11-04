'use client'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams, usePathname } from 'next/navigation' // Import useParams for routing if not already imported
import Image from 'next/image'
import TopLoader from '@/app/_components/TopLoader/page'
import { addToCart } from '@/app/_redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { selectUser } from '@/app/_redux/slices/userSlice'
import { toast } from 'react-toastify'

// Define a function to fetch category data based on the category.
const fetchCategoryData = async (category: string) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

const categoryEnum: Record<string, string> = {
  men: "men's clothing",
  women: "women's clothing",
  jewelery: 'jewelery',
  electronics: 'electronics',
}

const CategoryProducts: React.FC = () => {
  const params = useParams()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { category } = params

  const user = useSelector(selectUser)
  console.log(user)
  // Assuming category is a string
  const categoryToFetch = categoryEnum[category as keyof typeof categoryEnum]

  // Use 'categoryString' in useQuery
  const { data, isLoading, isError } = useQuery(
    ['categoryData', categoryToFetch],
    () => fetchCategoryData(categoryToFetch),
  )

  if (isLoading) {
    return <TopLoader />
  }

  if (isError) {
    return <div>Error fetching data.</div>
  }
  const categoryToShow = categoryEnum[category as keyof typeof categoryEnum]
  const handleAddToCart = (
    e: {
      preventDefault: () => void
      stopPropagation: () => void
    },
    product: any,
  ) => {
    e.stopPropagation()
    e.preventDefault()
    toast.success('Added to cart')
    dispatch(addToCart({ item: product, quantity: 1 }))
  }
  return (
    <div>
      <ul>
        <div className="bg-white">
          <h1 className="text-black p-10 pt-5 font-semibold text-2xl capitalize">
            {categoryToShow}
          </h1>
          <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {data.map((product: any) => (
                <Link
                  key={product.id}
                  href={`${category}/${product.id}`}
                  className="group"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full h-72 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <Image
                      height={100}
                      width={100}
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full bg-white object-contain object-top"
                    />
                  </div>
                  <h3 className="mt-4 h-10 line-clamp-2 text-sm text-gray-700">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                  </p>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="mt-2 w-full flex justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add to cart
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ul>
    </div>
  )
}

export default CategoryProducts
