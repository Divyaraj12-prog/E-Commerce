import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncAddToCart } from '../store/actions/cartAction'

const CATEGORIES = [
    { label: "Electronics", icon: "💻", bg: "from-blue-500 to-cyan-400" },
    { label: "Men's Clothing", icon: "👔", bg: "from-violet-500 to-purple-400" },
    { label: "Women's Clothing", icon: "👗", bg: "from-pink-500 to-rose-400" },
    { label: "Jewelry", icon: "💍", bg: "from-amber-500 to-yellow-400" },
]

const StarRating = ({ rate }) => {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rate) ? 'text-amber-400' : 'text-zinc-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    )
}

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.userReducer.users)
    const allProducts = useSelector(state => state.productReducer.products)
    const featuredProducts = allProducts.slice(0, 4)
    const [showLoginModal, setShowLoginModal] = useState(false)

    useEffect(() => {
        if (!user) {
            const timer = setTimeout(() => setShowLoginModal(true), 5000)
            return () => clearTimeout(timer)
        }
    }, [user])

    const handleAddToCart = (product) => {
        if (!user) { navigate('/login'); return }
        dispatch(asyncAddToCart(product))
    }

    const handleProductDetails = (productId) => {
        navigate(`/product/${productId}`)
    }

    return (
        <div className="min-h-screen bg-zinc-50">

            
            <section className="relative overflow-hidden bg-linear-to-br from-violet-600 via-indigo-600 to-blue-700">
                
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center gap-12">
                    
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-4 tracking-widest uppercase">
                            New Season Arrivals
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                            Discover Your <br />
                            <span className="text-amber-300">Perfect Style</span>
                        </h1>
                        <p className="text-violet-100 text-lg mb-8 max-w-md">
                            Explore thousands of products across all categories with unbeatable prices and fast delivery.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                            <NavLink
                                to="/products"
                                className="px-8 py-3.5 bg-white text-violet-700 font-semibold rounded-2xl hover:bg-violet-50 shadow-lg shadow-violet-900/20 transition-all duration-200"
                            >
                                Shop Now
                            </NavLink>
                            <NavLink
                                to="/products"
                                className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-200"
                            >
                                View Collections
                            </NavLink>
                        </div>
                    </div>

                    
                    <div className="flex-1 flex gap-4 justify-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 flex flex-col gap-6 min-w-55">
                            {[
                                { label: "Products", value: "10K+" },
                                { label: "Happy Customers", value: "50K+" },
                                { label: "Brands", value: "200+" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                                    <p className="text-violet-200 text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-zinc-900">Shop by Category</h2>
                    <p className="text-zinc-500 mt-1">Find what you're looking for, faster</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {CATEGORIES.map((cat) => (
                        <NavLink
                            key={cat.label}
                            to="/products"
                            className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${cat.bg} p-6 text-white flex flex-col items-center gap-3 group hover:scale-105 transition-transform duration-300 shadow-md`}
                        >
                            <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                            <span className="font-semibold text-sm">{cat.label}</span>
                        </NavLink>
                    ))}
                </div>
            </section>

            
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="rounded-3xl bg-linear-to-r from-amber-400 to-orange-500 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                    <div>
                        <p className="text-orange-900 font-semibold text-sm uppercase tracking-widest mb-1">Limited Time Offer</p>
                        <h3 className="text-3xl font-extrabold text-white">Get 30% off on all Electronics</h3>
                        <p className="text-orange-100 mt-1">Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded-lg">TECH30</span> at checkout</p>
                    </div>
                    <NavLink
                        to="/products"
                        className="whitespace-nowrap px-8 py-3.5 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 shadow-md transition-all duration-200"
                    >
                        Shop Electronics
                    </NavLink>
                </div>
            </section>

            
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-zinc-900">Featured Products</h2>
                        <p className="text-zinc-500 mt-1">Handpicked just for you</p>
                    </div>
                    <NavLink to="/products" className="text-violet-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        View all
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-zinc-100 overflow-hidden group transition-all duration-300">
                            <div className="relative bg-zinc-50 h-52 flex items-center justify-center overflow-hidden p-4">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-0 left-5 px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full capitalize">
                                    {product.category}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-zinc-800 line-clamp-2 leading-snug mb-2">{product.title}</h3>
                                <StarRating rate={product.rating.rate} />
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-lg font-bold text-violet-700">${product.price}</span>
                                    
                                    
                                        {user?.isAdmin ? (
                                            <button onClick={() => handleProductDetails(product.id)} className="p-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-sm shadow-violet-200">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </button>
                                        ):(
                                            <button onClick={() => handleAddToCart(product)} className="p-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-sm shadow-violet-200">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </button>
                                        )}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                
                {showLoginModal && !user && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                        <div className="bg-white rounded-3xl shadow-2xl border border-zinc-100 p-8 max-w-sm w-full text-center">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200 mx-auto mb-5">
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 mb-2">Welcome to LuxeCart!</h2>
                            <p className="text-zinc-500 text-sm mb-6">Sign in to add items to your cart, track orders, and enjoy a personalized experience.</p>
                            <div className="flex flex-col gap-3">
                                <NavLink
                                    to="/login"
                                    onClick={() => setShowLoginModal(false)}
                                    className="w-full py-3 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-violet-200"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    onClick={() => setShowLoginModal(false)}
                                    className="w-full py-3 border border-violet-200 text-violet-600 font-semibold rounded-xl hover:bg-violet-50 transition-colors"
                                >
                                    Create Account
                                </NavLink>
                                <button
                                    onClick={() => setShowLoginModal(false)}
                                    className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors mt-1"
                                >
                                    Continue browsing
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>

           
            <section className="bg-zinc-900 py-20">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Stay in the Loop</h2>
                    <p className="text-zinc-400 mb-8">Get the latest deals, new arrivals, and exclusive offers straight to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-5 py-3.5 bg-zinc-800 text-white placeholder-zinc-500 rounded-2xl border border-zinc-700 focus:outline-none focus:border-violet-500 transition-colors"
                        />
                        <button className="px-6 py-3.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg shadow-violet-900/40">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

           
            <footer className="bg-zinc-950 py-12 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <span className="text-white font-bold">LuxeCart</span>
                    </div>
                    <p>© 2026 LuxeCart. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home