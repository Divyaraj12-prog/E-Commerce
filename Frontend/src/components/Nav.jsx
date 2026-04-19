import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncLogoutUser } from '../store/actions/userAction'

const Nav = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false)

    const user = useSelector(state => state.userReducer.users)
    const cartCount = useSelector(state =>
        state.cartReducer.cart.reduce((sum, item) => sum + item.qty, 0)
    )

    const handleLogout = () => {
        dispatch(asyncLogoutUser())
        setMenuOpen(false)
        navigate("/login")
    }

    const linkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors duration-200 ${
            isActive ? 'text-violet-600' : 'text-zinc-700 hover:text-violet-600'
        }`

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                            Luxe<span className="text-zinc-800">Cart</span>
                        </span>
                    </NavLink>

                    
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/" className={linkClass}>Home</NavLink>
                        <NavLink to="/products" className={linkClass}>Products</NavLink>
                        <NavLink to="/cart" className={linkClass}>Cart</NavLink>
                        {user && <NavLink to="/profile" className={linkClass}>Profile</NavLink>}
                        {user?.isAdmin && (
                            <div className="flex items-center">
                                <NavLink to="/admin/create-product" className={linkClass}>
                                    <span className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                                        Products
                                    </span>
                                </NavLink>
                                
                            </div>
                        )}
                    </div>

                    
                    <div className="hidden md:flex items-center gap-3">
                        
                        <NavLink to="/cart" className="relative p-2 rounded-xl text-zinc-600 hover:text-violet-600 hover:bg-violet-50 transition-all duration-200">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>

                        {user ? (
                           
                            <div className="flex items-center gap-3">
                                <NavLink to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-violet-50 transition-all duration-200">
                                    <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                                        {user.username?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-sm font-medium text-zinc-700">{user.username}</span>
                                    {user.isAdmin && (
                                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">Admin</span>
                                    )}
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-50 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            
                            <div className="flex items-center gap-3">
                                <NavLink
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-violet-600 border border-violet-200 rounded-xl hover:bg-violet-50 transition-all duration-200"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-violet-600 to-indigo-600 rounded-xl hover:opacity-90 shadow-sm shadow-violet-200 transition-all duration-200"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>

                    
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-xl text-zinc-600 hover:bg-zinc-100 transition-all duration-200"
                    >
                        {menuOpen ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-zinc-100 px-4 py-4 flex flex-col gap-4">
                    <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/products" className={linkClass} onClick={() => setMenuOpen(false)}>Products</NavLink>
                    <NavLink to="/cart" className={linkClass} onClick={() => setMenuOpen(false)}>Cart</NavLink>
                    {user && <NavLink to="/profile" className={linkClass} onClick={() => setMenuOpen(false)}>Profile</NavLink>}
                    {user?.isAdmin && (
                        <>
                            <NavLink to="/admin/create-product" className={linkClass} onClick={() => setMenuOpen(false)}>
                                Admin Products
                            </NavLink>
                        </>
                    )}
                    <div className="flex gap-3 pt-2 border-t border-zinc-100">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="flex-1 text-center px-4 py-2 text-sm font-medium text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-50 transition-all"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <NavLink to="/login" className="flex-1 text-center px-4 py-2 text-sm font-medium text-violet-600 border border-violet-200 rounded-xl hover:bg-violet-50 transition-all" onClick={() => setMenuOpen(false)}>Login</NavLink>
                                <NavLink to="/register" className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-violet-600 to-indigo-600 rounded-xl hover:opacity-90 transition-all" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Nav