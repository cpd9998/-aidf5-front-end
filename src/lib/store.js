import { configureStore } from '@reduxjs/toolkit'
import  counterReducer from '../lib/features/counterSlice.js'
import  {api}  from '../lib/api.js'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        counter:counterReducer,
        [api.reducerPath]:api.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)