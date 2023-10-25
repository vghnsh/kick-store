'use client'
import { auth } from '@/app/firebase/config'
import { useSelector } from 'react-redux'
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { selectUser } from '@/app/redux/slices/userSlice'
import { useEffect } from 'react'

const Login = () => {
  const user = useSelector(selectUser)
  const router = useRouter()
  console.log(user)
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  // console.log(user)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const mail = formData.get('email') as string | null // Ensure mail is of type string or null
    const password = formData.get('password') as string | null // Ensure password is of type string or null

    if (mail !== null && password !== null) {
      signInWithEmailAndPassword(auth, mail, password)
        .then((res) => {
          console.log('res', res)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
  }

  useEffect(() => {
    getRedirectResult(auth).then((res) => {
      // router.push('/')
      console.log(res)
    })
  }, [])

  const singInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const res = await signInWithRedirect(auth, provider)
      console.log(res)
      router.push('/')
    } catch (err) {
      console.log('err: ', err)
    }
  }

  return (
    <>
      <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto w-auto"
            src="/assets/Images/ic_logo.png"
            alt=""
            width={60}
            height={60}
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <p className="text-center text-sm text-gray-500">
          Not a member?
          <a
            href="/signup"
            className="pl-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </p>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={(e) => onSubmit(e)}
            className="space-y-3"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-3 text-gray-500">or try using</p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <div className="my-6">
            <button
              onClick={singInWithGoogle}
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in using google
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
