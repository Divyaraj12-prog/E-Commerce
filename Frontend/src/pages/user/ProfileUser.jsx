import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { asyncLogoutUser, asyncDeleteUser } from '../../store/actions/userAction'

const DUMMY_ORDERS = [
    // { id: "#LXC-1001", date: "Feb 20, 2026", status: "Delivered", total: 154.25, items: 3 },
    // { id: "#LXC-1002", date: "Feb 14, 2026", status: "Shipped", total: 64.00, items: 1 },
    // { id: "#LXC-1003", date: "Feb 05, 2026", status: "Processing", total: 22.30, items: 2 },
]

const statusColors = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Processing: "bg-amber-100 text-amber-700",
    Cancelled: "bg-rose-100 text-rose-600",
}

const ProfileUser = () => {
    const user = useSelector((state) => state.userReducer.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user, navigate])

    if (!user) return null

    const handleLogout = () => {
        dispatch(asyncLogoutUser())
        navigate('/login')
    }

    const DeleteHandler = (id) => {
        dispatch(asyncDeleteUser(id));
        navigate('/register');
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* ── Profile Sidebar ── */}
                    <div className="w-full lg:w-72 shrink-0 flex flex-col gap-5">

                        {/* Avatar Card */}
                        <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-6 flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <div className="w-20 h-20 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-violet-200">
                                    {user.username?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                            </div>
                            <h2 className="text-lg font-bold text-zinc-900">{user?.username || "Default User"}</h2>
                            <p className="text-zinc-500 text-sm">{user?.email || "default@example.com"}</p>
                            <span className="mt-2 px-3 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">{user.isAdmin ? 'Admin' : 'Customer'}</span>

                            <NavLink
                                to="/profile/update"
                                className="mt-5 w-full py-2.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-violet-200"
                            >
                                Edit Profile
                            </NavLink>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 grid grid-cols-3 divide-x divide-zinc-100 text-center">
                            {[
                                { label: "Orders", value: user?.orders || 0 },
                                { label: "Wishlist", value: user?.wishlist || 0 },
                                { label: "Reviews", value: user?.reviews || 0 },
                            ].map(stat => (
                                <div key={stat.label} className="px-2">
                                    <p className="text-xl font-bold text-violet-700">{stat.value}</p>
                                    <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Links */}
                        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-3 flex flex-col gap-1">
                            {[
                                { icon: "📦", label: "My Orders", to: "/profile" },
                                { icon: "❤️", label: "Wishlist", to: "/profile" },
                                { icon: "🏠", label: "Addresses", to: "/profile" },
                                { icon: "💳", label: "Payment Methods", to: "/profile" },
                                { icon: "🔔", label: "Notifications", to: "/profile" },
                                { icon: "🔒", label: "Security", to: "/profile" },
                            ].map(link => (
                                <NavLink key={link.label} to={link.to} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-600 hover:bg-violet-50 hover:text-violet-700 transition-all">
                                    <span>{link.icon}</span>
                                    <span>{link.label}</span>
                                </NavLink>
                            ))}
                            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-500 hover:bg-rose-50 transition-all mt-1 border-t border-zinc-50 pt-3">
                                <span>🚪</span>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>

                    {/* ── Main Content ── */}
                    <div className="flex-1 flex flex-col gap-6">

                        {/* Personal Info */}
                        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold text-zinc-900 text-lg">Personal Information</h3>
                                <NavLink to="/profile/update" className="text-xs font-semibold text-violet-600 hover:text-violet-700">Edit →</NavLink>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { label: "Username", value: user?.username || "Default User" },
                                    { label: "Email", value: user?.email || "default@example.com" },
                                    // { label: "Phone", value: user?.phone || "+1 (555) 000-0000" },
                                    // { label: "Member Since", value: user?.memberSince || "February 2026" },
                                ].map(field => (
                                    <div key={field.label} className="bg-zinc-50 rounded-xl p-3.5">
                                        <p className="text-xs text-zinc-400 font-medium mb-0.5">{field.label}</p>
                                        <p className="text-sm font-semibold text-zinc-800">{field.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order History */}
                        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold text-zinc-900 text-lg">Recent Orders</h3>
                                <button className="text-xs font-semibold text-violet-600 hover:text-violet-700">View all →</button>
                            </div>
                            <div className="flex flex-col gap-3">
                                {DUMMY_ORDERS.map(order => (
                                    <div key={order.id} className="border border-zinc-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-violet-200 hover:bg-violet-50/30 transition-all cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
                                                <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-zinc-800 text-sm">{order.id}</p>
                                                <p className="text-xs text-zinc-400">{order.date} · {order.items} items</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                                            <span className="font-bold text-zinc-900 text-sm">${order.total}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Saved Address */}
                        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold text-zinc-900 text-lg">Delivery Address</h3>
                                <button className="text-xs font-semibold text-violet-600 hover:text-violet-700">+ Add new</button>
                            </div>
                            <div className="border-2 border-dashed border-violet-200 bg-violet-50/50 rounded-xl p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-semibold text-zinc-800 text-sm">Home</p>
                                        <p className="text-sm text-zinc-500 mt-1">123 Main Street, Apt 4B<br />New York, NY 10001, USA</p>
                                    </div>
                                    <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">Default</span>
                                </div>
                            </div>
                        </div>

                        {/* Delete Account (UI only) */}
                        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-rose-700 text-lg">Delete Account</h3>
                                    <p className="text-sm text-zinc-500 mt-1">
                                        This will permanently remove your profile and all associated data.
                                    </p>
                                </div>
                                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-600">
                                    Danger Zone
                                </span>
                            </div>

                            <div className="mt-5 border border-rose-100 bg-rose-50/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <p className="text-sm text-rose-700 font-medium">
                                    Deleting your account is irreversible.
                                </p>
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors"
                                    onClick={()=> DeleteHandler(user.id)}
                                >
                                    Delete My Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUser
