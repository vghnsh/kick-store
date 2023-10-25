'use client'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'next/navigation' // Import useParams for routing if not already imported

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

const categoryEnum = {
  men: "men's clothing",
  women: "women's clothing",
  jewelery: 'jewelery',
  electronics: 'electronics',
}

const CategoryProducts: React.FC = () => {
  const params = useParams()
  const { category } = params

  // Assuming category is a string
  const categoryToFetch = categoryEnum[category as keyof typeof categoryEnum]

  // Use 'categoryString' in useQuery
  const { data, isLoading, isError } = useQuery(
    ['categoryData', categoryToFetch],
    () => fetchCategoryData(categoryToFetch),
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data.</div>
  }

  return (
    <div>
      <h1>{category} Products</h1>
      <ul>
        {data.map((item: { id: number; title: string }) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryProducts
