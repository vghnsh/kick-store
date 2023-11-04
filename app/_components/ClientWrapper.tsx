'use client'

import { useEffect } from 'react'
import { auth } from '../_firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { selectUser, setUser } from '../_redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header/page'
import { usePathname } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

const ClientWrapper: React.FC<Props> = ({ children }) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  console.log('gloabal state', user)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user
        dispatch(setUser(uid))
      } else {
        console.log('No user')
      }
    })
  }, [dispatch])

  return (
    <div>
      {pathname !== '/login' && pathname !== '/signup' && <Header />}
      {children}
    </div>
  )
}

export default ClientWrapper
