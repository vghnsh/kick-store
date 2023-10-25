// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: User | null
}

interface User {
  id: number
  name: string
  email: string
  // Add more user properties here
}

const initialState: UserState = {
  user: null,
}

const { reducer, actions } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        id: action.payload.uid,
        name: action.payload.displayName,
        email: action.payload.email,
      }
    },
    clearUser: (state) => {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = actions

export const selectUser = (state: { user: UserState }) => state.user.user

export default reducer
