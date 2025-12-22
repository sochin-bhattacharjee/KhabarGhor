import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        loading:true,
        city:null
    },
    reducers: {
    setUserData: (state, action) => {
            state.userData = action.payload
            state.loading = false
    },
    setCity: (state, action) => {
            state.city = action.payload
    },
    clearUserData: (state) => {
        state.userData = null
        state.loading = false
    }
}
})
export const {setUserData, setCity, clearUserData }=userSlice.actions
export default userSlice.reducer