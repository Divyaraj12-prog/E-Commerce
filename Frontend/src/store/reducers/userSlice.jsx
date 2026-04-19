import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    users: null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loadUsers:(state,action)=>{
            state.users = action.payload
        }
    }
})
export const {loadUsers} = userSlice.actions
export default userSlice.reducer