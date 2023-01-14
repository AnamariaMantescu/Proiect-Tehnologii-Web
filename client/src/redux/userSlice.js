import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: false,
}

export const userSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer