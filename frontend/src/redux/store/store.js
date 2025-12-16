import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../slice/userSlice/userSlice"

export const store = configureStore({
    reducer:{
        user:userSlice
    }
})