import { addToCart, removeFromCart, updateQty, loadCart, clearCart } from '../reducers/cartSlice'

const CART_KEY = (userId) => `cart_${userId}`

const saveCart = (getState, userId) => {
    const cart = getState().cartReducer.cart
    localStorage.setItem(CART_KEY(userId), JSON.stringify(cart))
}


export const asyncLoadCart = () => (dispatch, getState) => {
    const user = getState().userReducer.users
    if (!user) return
    const stored = localStorage.getItem(CART_KEY(user.id))
    dispatch(loadCart(stored ? JSON.parse(stored) : []))
}


export const asyncAddToCart = (product) => (dispatch, getState) => {
    const user = getState().userReducer.users
    if (!user) return
    dispatch(addToCart(product))
    saveCart(getState, user.id)
}


export const asyncRemoveFromCart = (productId) => (dispatch, getState) => {
    const user = getState().userReducer.users
    if (!user) return
    dispatch(removeFromCart(productId))
    saveCart(getState, user.id)
}


export const asyncUpdateQty = (productId, qty) => (dispatch, getState) => {
    const user = getState().userReducer.users
    if (!user) return
    if (qty < 1) {
        dispatch(removeFromCart(productId))
    } else {
        dispatch(updateQty({ id: productId, qty }))
    }
    saveCart(getState, user.id)
}


export const asyncClearCart = () => (dispatch, getState) => {
    const user = getState().userReducer.users
    if (!user) return
    dispatch(clearCart())
    localStorage.removeItem(CART_KEY(user.id))
}