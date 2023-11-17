'use client'
import React from 'react'

const page = () => {
  return (
    <div className="bg-gray-100">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-white bg-red-600 w-16 h-16 mx-auto my-6 p-2 rounded-full"
        >
          <path
            fill="currentColor"
            d="M19.07 6.93a1 1 0 0 0-1.41 0L12 10.59l-5.66-5.66a1 1 0 0 0-1.41 1.41L10.59 12l-5.66 5.66a1 1 0 0 0 0 1.41A1 1 0 0 0 5.93 19a1 1 0 0 0 .71-.29L12 13.41l5.66 5.66a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41L13.41 12l5.66-5.66a1 1 0 0 0 0-1.41z"
          ></path>
        </svg>

        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Failed!
          </h3>
          <p className="text-gray-600 my-2">
            Something went wrong, please try again later.
          </p>
          <div className="py-10 text-center">
            <a
              href="#"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
