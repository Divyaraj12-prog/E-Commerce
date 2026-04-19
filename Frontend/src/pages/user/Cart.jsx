import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncUpdateQty, asyncRemoveFromCart, asyncClearCart } from '../../store/actions/cartAction'

const Cart = () => {
    const cartItems = useSelector(state => state.cartReducer.cart)
    const dispatch = useDispatch()

    const updateQty = (id, delta) => {
        const item = cartItems.find(i => i.id === id)
        if (item) dispatch(asyncUpdateQty(id, item.qty + delta))
    }

    const removeItem = (id) => {
        dispatch(asyncRemoveFromCart(id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
    const tax = subtotal * 0.08
    const shipping = subtotal > 100 ? 0 : 9.99
    const total = subtotal + tax + shipping

    return (
        <div className="min-h-screen bg-zinc-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-3xl font-bold text-zinc-900 mb-2">Shopping Cart</h1>
                <p className="text-zinc-500 text-sm mb-8">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>

                {cartItems.length > 0 && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => dispatch(asyncClearCart())}
                            className="text-sm text-rose-500 border border-rose-200 px-4 py-1.5 rounded-xl hover:bg-rose-50 transition-colors font-medium"
                        >
                            Clear Cart
                        </button>
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-16 text-center">
                        <svg className="w-20 h-20 mx-auto text-zinc-200 mb-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 className="text-xl font-bold text-zinc-900 mb-2">Your cart is empty</h2>
                        <p className="text-zinc-500 mb-6">Looks like you haven't added anything yet.</p>
                        <NavLink to="/products" className="inline-block px-6 py-3 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-md shadow-violet-200">
                            Start Shopping
                        </NavLink>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">

                        
                        <div className="flex-1 flex flex-col gap-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 flex gap-4 items-center">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-50 rounded-xl flex items-center justify-center shrink-0 p-2">
                                        <img src={item.image} alt={item.title} className="h-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-xs font-semibold text-violet-600 capitalize">{item.category}</span>
                                        <h3 className="text-sm font-semibold text-zinc-800 line-clamp-2 leading-snug mt-0.5">{item.title}</h3>
                                        <p className="text-violet-700 font-bold mt-1">${item.price}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-3 shrink-0">
                                        
                                        <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-1 py-0.5">
                                            <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-200 transition-colors text-lg leading-none">−</button>
                                            <span className="text-sm font-semibold text-zinc-800 w-5 text-center">{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-200 transition-colors text-lg leading-none">+</button>
                                        </div>
                                        <p className="text-sm font-bold text-zinc-900">${(item.price * item.qty)}</p>
                                        <button onClick={() => removeItem(item.id)} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>

                       
                        <div className="w-full lg:w-80 shrink-0">
                            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 sticky top-20">
                                <h2 className="text-lg font-bold text-zinc-900 mb-5">Order Summary</h2>
                                <div className="flex flex-col gap-3 text-sm">
                                    <div className="flex justify-between text-zinc-600">
                                        <span>Subtotal ({cartItems.reduce((s, i) => s + i.qty, 0)} items)</span>
                                        <span>${subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-600">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-600">
                                        <span>Tax (8%)</span>
                                        <span>${tax}</span>
                                    </div>
                                    {shipping === 0 && (
                                        <div className="bg-green-50 text-green-700 text-xs rounded-lg px-3 py-2">
                                            🎉 You qualify for free shipping!
                                        </div>
                                    )}
                                    <div className="border-t border-zinc-100 pt-3 flex justify-between font-bold text-zinc-900 text-base">
                                        <span>Total</span>
                                        <span>${total}</span>
                                    </div>
                                </div>
                                <button className="w-full mt-5 py-3.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 shadow-md shadow-violet-200 transition-all duration-200">
                                    Proceed to Checkout <span className='text-[12px] text-amber-100'>(In-Progress)</span>
                                </button>
                                <NavLink to="/products" className="block text-center text-sm text-violet-600 mt-3 font-medium hover:text-violet-700 transition-colors">
                                    ← Continue Shopping
                                </NavLink>

                                
                                <div className="grid grid-cols-2 gap-2 mt-5 pt-5 border-t border-zinc-50">
                                    {[
                                        { icon: "🔒", text: "Secure Checkout" },
                                        { icon: "↩️", text: "Free Returns" },
                                        { icon: "🚚", text: "Fast Delivery" },
                                        { icon: "💳", text: "Safe Payment" },
                                    ].map(badge => (
                                        <div key={badge.text} className="flex items-center gap-1.5 text-xs text-zinc-500">
                                            <span>{badge.icon}</span>
                                            <span>{badge.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
