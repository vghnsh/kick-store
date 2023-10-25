'use client'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'next/navigation' // Import useParams for routing if not already imported

// Define a function to fetch category data based on the category.
const fetchProductData = async (id: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

const CategoryProducts: React.FC = () => {
  const params = useParams()
  const { product } = params

  console.log(typeof product)

  // Assuming category is a string

  // Use 'categoryString' in useQuery
  const { data, isLoading, isError } = useQuery(['categoryData', product], () =>
    fetchProductData(product as string),
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data.</div>
  }

  return (
    <div>
      <h1>{product} Products</h1>
      {data?.title}
    </div>
  )
}

export default CategoryProducts
