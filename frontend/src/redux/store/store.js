import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../slice/userSlice/userSlice"
import ownerSlice from "../slice/ownerSlice/ownerSlice"

export const store = configureStore({
    reducer:{
        user:userSlice,
        owner:ownerSlice,
    }
})