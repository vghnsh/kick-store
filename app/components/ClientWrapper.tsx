'use client'

import { useEffect } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { selectUser, setUser } from '../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  children: React.ReactNode
}

const ClientWrapper: React.FC<Props> = ({ children }) => {
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

  return <div>{children}</div>
}

export default ClientWrapper
