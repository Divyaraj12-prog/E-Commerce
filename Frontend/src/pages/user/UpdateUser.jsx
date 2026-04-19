import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { asyncUpdateUser } from '../../store/actions/userAction'

const UpdateUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer.users)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: user?.username || "Default User",
            email: user?.email || "default@example.com",
        }
    })
    const [avatarPreview] = useState(null)
    const [passwordMatch, setpasswordMatch] = useState(true)

    const onSubmit = async (data) => {
        if (data.currentPassword && data.currentPassword !== user.password) {
            setpasswordMatch(false)
            return
        }
        setpasswordMatch(true)
        const updated = await dispatch(asyncUpdateUser(user.id, {
            username: data.username,
            email: data.email,
            ...(data.newPassword ? { password: data.newPassword } : {}),
        }))
        if (updated) navigate('/profile')
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">

                <div className="flex items-center gap-3 mb-8">
                    <NavLink to="/profile" className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:text-violet-600 hover:border-violet-200 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </NavLink>
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900">Edit Profile</h1>
                        <p className="text-zinc-500 text-sm">Update your personal information</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">

                    
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-violet-200 overflow-hidden">
                                {avatarPreview ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" /> : "D"}
                            </div>
                            <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-md cursor-pointer hover:bg-violet-700 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input type="file" accept="image/*" className="hidden" />
                            </label>
                        </div>
                        <p className="text-xs text-zinc-400 mt-3">Click the camera icon to upload a new photo</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                        
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Username</label>
                            <input
                                type="text"
                                {...register("username", { required: "Username is required", minLength: { value: 3, message: "Min 3 characters" } })}
                                className={`w-full px-4 py-3 bg-zinc-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all ${errors.username ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-400'}`}
                            />
                            {errors.username && <p className="text-rose-500 text-xs mt-1">{errors.username.message}</p>}
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                })}
                                className={`w-full px-4 py-3 bg-zinc-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all ${errors.email ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-400'}`}
                            />
                            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="border-t border-zinc-100 pt-5">
                            <h4 className="font-semibold text-zinc-800 mb-4">Change Password</h4>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Current Password</label>
                                    <input
                                        type="password"
                                        {...register("currentPassword", {
                                            required: "Current password is required"
                                        })}
                                        placeholder="Enter current password"
                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-violet-400 transition-all"
                                    />
                                    {errors.currentPassword && <p className="text-rose-500 text-xs mt-1">{errors.currentPassword.message}</p>}
                                    {!passwordMatch && <p className="text-rose-500 text-xs mt-1">Current password does not match</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">New Password</label>
                                    <input
                                        type="password"
                                        {...register("newPassword", {
                                            required: "New password is required",
                                            minLength: { value: 6, message: "Min 6 characters" }
                                        })}
                                        placeholder="Enter new password"
                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-violet-400 transition-all"
                                        
                                    />
                                    {errors.newPassword && <p className="text-rose-500 text-xs mt-1">{errors.newPassword.message}</p>}
                                </div>
                            </div>
                        </div>

                        
                        <div className="flex gap-3 pt-2">
                            <NavLink
                                to="/profile"
                                className="flex-1 py-3 border border-zinc-200 text-zinc-700 font-semibold rounded-xl text-center hover:bg-zinc-50 transition-colors text-sm"
                            >
                                Cancel
                            </NavLink>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 shadow-md shadow-violet-200 transition-all text-sm"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser
