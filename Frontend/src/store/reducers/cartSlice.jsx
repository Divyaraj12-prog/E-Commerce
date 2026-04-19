import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    cart:[]
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        loadCart:(state,action)=>{
            state.cart = action.payload
        },
        addToCart:(state,action)=>{
            const existing = state.cart.find(i => i.id === action.payload.id)
            if(existing){
                existing.qty += 1
            } else {
                state.cart.push({...action.payload, qty: 1})
            }
        },
        removeFromCart:(state,action)=>{
            state.cart = state.cart.filter(i => i.id !== action.payload)
        },
        updateQty:(state,action)=>{
            const {id, qty} = action.payload
            const item = state.cart.find(i => i.id === id)
            if(item) item.qty = qty
        },
        clearCart:(state)=>{
            state.cart = []
        }
    }
})
export const {loadCart, addToCart, removeFromCart, updateQty, clearCart} = cartSlice.actions
export default cartSlice.reducer