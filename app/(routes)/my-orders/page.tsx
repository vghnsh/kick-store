'use client'
import { DateTime } from 'luxon'
import { db } from '@/app/_firebase/config'
import { selectUser } from '@/app/_redux/slices/userSlice'
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Stripe from 'stripe'
import { useQuery } from 'react-query'
import TopLoader from '@/app/_components/TopLoader/page'

// Import necessary modules and dependencies...

const Page = () => {
  const stripe = require('stripe')(
    'sk_test_51O8vX2SE6vnUeSmIthLJ4JTHAcBWgKDZrR4ngbUL9MQnlcvXIInqLKRLE3LaJs35x0Ust3sqH3iB6T8IanzkmNS500FDQlg9B4',
  )

  const fetchData = async (userId: string) => {
    const ordersCollection = collection(db, 'users', userId, 'orders')
    const snapshot = await getDocs(ordersCollection)
    const data = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const firebaseData = doc.data()
        const session = await fetchProducts(firebaseData.data.id)
        firebaseData.product = session
        return firebaseData
      }),
    )
    return data
  }

  const fetchProducts = async (sessionId: any) => {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)
    return lineItems
  }

  // console.log(process.env.NEXT_STRIPE_SECRET_KEY, stripe1)

  const user = useSelector(selectUser)
  // const [history, setHistory] = useState<DocumentData[]>([])

  // const fetchProducts = async (sessionId: string): Promise<[]> => {
  //   const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)
  //   return lineItems
  // }

  // useEffect(() => {
  //   if (!user) {
  //     return
  //   }

  //   const userId = user?.id?.toString() // Ensure userId is a string
  //   const ordersCollection = collection(db, 'users', userId, 'orders')

  //   const fetchData = async () => {
  //     try {
  //       const snapshot = await getDocs(ordersCollection)
  //       const updatedHistory = await Promise.all(
  //         snapshot.docs.map(async (doc) => {
  //           const firebaseData = doc.data()
  //           const session = await fetchProducts(firebaseData.data.id)
  //           firebaseData.product = session
  //           return firebaseData
  //         }),
  //       )

  //       setHistory(updatedHistory)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }

  //   fetchData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user])

  // const user = useSelector(selectUser);
  const userId = user?.id?.toString() || '' // Use an empty string if userId is undefined

  const {
    data: history,
    isLoading,
    isError,
  } = useQuery(['history', userId], () => fetchData(userId), {
    enabled: !!userId, // Ensure that the query is only executed when userId is available
  })

  var sortedData = history?.sort(function (a, b) {
    return b.time - a.time
  })

  if (isLoading) {
    return <TopLoader />
  }

  return (
    <div className="flex flex-col justify-center md:flex-row gap-4 bg-white">
      <div className="md:w-3/4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4  overflow-x-auto">
          <table className="w-full text-black">
            {sortedData?.map((item) => (
              <div key={Math.random()}>
                <thead style={{ marginBottom: '2rem' }}>
                  <tr>
                    <th className="text-left font-semibold py-4 w-1/5">
                      Product
                    </th>
                    <th className="text-left font-semibold w-2/5">Name</th>
                    <th className="text-left font-semibold py-4 px-2 pl-2 w-1/5">
                      Price
                    </th>
                    <th className="text-left font-semibold py-4 w-1/5">
                      Quantity
                    </th>
                    <th className="text-left font-semibold py-4 pl-2 w-1/5">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {item?.product?.data?.map(
                    (item: {
                      price: {
                        metadata: {
                          image: string | StaticImport
                          name:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | React.PromiseLikeOfReactNode
                            | null
                            | undefined
                        }
                      }
                      amount_total: number
                      quantity:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.PromiseLikeOfReactNode
                        | null
                        | undefined
                    }) => {
                      return (
                        <tr key={Math.random()}>
                          <td className="py-4 w-1/5">
                            <div className="fl ex items-center h-32 w-32 object-contain">
                              <Image
                                width={0}
                                height={0}
                                sizes="100vw"
                                src={item.price.metadata.image}
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
                            <span className="font-semibold">
                              {item.price.metadata?.name}
                            </span>
                          </td>
                          <td className="py-4 pl-2 w-1/5">
                            ₹{item.amount_total / 100}
                          </td>
                          <td className="py-4 w-1/5">
                            <div className="flex items-center">
                              <span className="text-center w-8">
                                {item.quantity}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 pl-2 w-1/5">
                            ₹ ₹
                            {((item.amount_total as number) / 100) *
                              (item.quantity as number)}
                          </td>
                        </tr>
                      )
                    },
                  )}
                </tbody>
                <div className="d-flex justify-end mb-4">
                  <h1 className="text-end">
                    Total amount paid: ₹{item?.amount / 100}
                  </h1>
                  <address className="text-end">
                    Address: {item?.cart?.address}
                  </address>
                  <time className="block text-end">
                    Time:{' '}
                    {item?.time
                      ? DateTime.fromSeconds(item?.time).toFormat(
                          'dd MMM, yyyy HH:mm',
                        )
                      : ''}
                  </time>
                </div>
                <hr />
              </div>
            ))}
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page
