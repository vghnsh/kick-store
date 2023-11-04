'use client'

import { useEffect, useState } from 'react'
import { auth } from '../_firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser } from '../_redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import Header from './Header/page'
import { usePathname } from 'next/navigation'
import TopLoader from './TopLoader/page'

type Props = {
  children: React.ReactNode
}

const ClientWrapper: React.FC<Props> = ({ children }) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user
        dispatch(setUser(uid))
        setLoading(false)
      } else {
        setLoading(false)
        console.log('No user')
      }
    })
  }, [dispatch])

  if (loading && (pathname === '/login' || pathname === '/signup')) {
    return <TopLoader />
  }

  return (
    <div>
      {pathname !== '/login' && pathname !== '/signup' && <Header />}
      {children}
    </div>
  )
}

export default ClientWrapper
