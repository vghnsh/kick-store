'use client' // This is a client component 👈🏽

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, selectUser, setUser } from './_redux/slices/userSlice'
import { signOut } from 'firebase/auth'
import { auth } from './_firebase/config'
import Link from 'next/link'
import Header from './_components/Header/page'

const products = [
  {
    name: 'Men Clothing',
    description:
      "Discover a wide range of stylish men's clothing for every occasion.",
    href: '#',
  },
  {
    name: 'Women Clothing',
    description:
      "Explore the latest trends in women's fashion and find your perfect look.",
    href: '#',
  },
  {
    name: 'Jewelery',
    description:
      'Browse our exquisite collection of jewelry pieces for any special moment.',
    href: '#',
  },
  {
    name: 'Electronics',
    description:
      'Shop the latest electronic gadgets and stay connected with cutting-edge technology.',
    href: '#',
  },
]

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const handleLogout = () => {
    dispatch(clearUser())
    signOut(auth)
  }
  return (
    <div className="bg-white">
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container py-4 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
          <div className="flex flex-col jusitfy-center items-center space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 w-full">
              <Link href="categories/women">
                <div className="relative group flex justify-center items-center h-3/4 w-full">
                  <Image
                    className="object-center object-cover h-full w-full"
                    src="https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png"
                    alt="girl-image"
                    width={1000}
                    height={1000}
                  />
                  <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4  absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                    Women
                  </button>
                </div>
              </Link>

              <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0 h-3/4">
                <div
                  className="relative group flex justify-center items-center w-full"
                  style={{ height: '45%' }}
                >
                  <Link
                    href="categories/electronics"
                    className="flex justify-center"
                    style={{ height: '-webkit-fill-available' }}
                  >
                    <Image
                      className="object-center object-cover h-auto w-full"
                      src="/assets/Images/elect.jpg"
                      alt="shoe-image"
                      width={1000}
                      height={1000}
                      style={{ height: '-webkit-fill-available' }}
                    />
                    <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                      electronics
                    </button>
                  </Link>
                </div>
                <div
                  className="relative group flex justify-center items-center w-full"
                  style={{ height: '48%' }}
                >
                  <Link
                    href="categories/jewelery"
                    className="flex justify-center"
                    style={{ height: '-webkit-fill-available' }}
                  >
                    <Image
                      className="object-center object-cover w-full"
                      src="/assets/Images/jew1.jpg"
                      alt="watch-image"
                      width={1000}
                      height={100}
                      style={{ height: '-webkit-fill-available' }}
                    />
                    <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                      jewelery
                    </button>
                  </Link>
                </div>
              </div>
              <Link href="categories/men">
                <div className="relative group justify-center items-center h-3/4 w-full hidden lg:flex">
                  <Image
                    className="object-center object-cover h-full w-full"
                    src="/assets/Images/men.jpg"
                    alt="girl-image"
                    width={1000}
                    height={1000}
                  />
                  <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                    men
                  </button>
                </div>
              </Link>
              <Link href="categories/men">
                <div className="relative group flex justify-center items-center h-full w-full mt-4 md:hidden md:mt-8 lg:hidden">
                  <Image
                    className="object-center object-cover h-full w-full hidden md:block"
                    src="/assets/Images/men.jpg"
                    alt="girl-image"
                    width={1000}
                    height={1000}
                  />
                  <Image
                    className="object-center object-cover h-full w-full md:hidden"
                    src="/assets/Images/men.jpg"
                    alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
                    width={1000}
                    height={1000}
                  />
                  <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                    men
                  </button>
                </div>
              </Link>
            </div>
            <Link href="categories/men">
              <div className="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden">
                <Image
                  className="object-center object-cover h-full w-full hidden md:block"
                  src="/assets/Images/men.jpg"
                  alt="girl-image"
                  width={1000}
                  height={1000}
                />
                <Image
                  className="object-center object-cover h-full w-full sm:hidden"
                  src="/assets/Images/men.jpg"
                  alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
                  width={1000}
                  height={1000}
                />
                <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                  men
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
