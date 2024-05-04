import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,

    signin: {
        isFetching: false,
        error: false
    },

    logout: {
        isFetching: false,
        error: false
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //Sign in
        signInBegin: (state) => {
            state.signin.isFetching = true
        },
        
        signInSuccess: (state, action) => {
            state.signin.isFetching = false
            state.currentUser = action.payload
        },

        signInFailure: (state) => {
            state.signin.isFetching = false
            state.signin.error = true
        },

        //Logout
        logoutBegin: (state) => {
            state.logout.isFetching = true
        },

        logoutSuccess: (state) => {
            state.logout.isFetching = false
            state.currentUser = null
        },

        logoutFailure: (state) => {
            state.logout.isFetching = false
            state.logout.error = true
        },
    }
})

export const slice = authSlice.actions
export default authSlice.reducer