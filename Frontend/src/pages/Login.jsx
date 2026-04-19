import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { asyncLoginUser } from '../store/actions/userAction'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors },reset } = useForm()
    const [showPassword, setShowPassword] = useState(false)

    const [loginError, setLoginError] = useState(null)

    const onSubmit = async (data) => {
        setLoginError(null)
        const user = await dispatch(asyncLoginUser(data))
        if (user) {
            reset()
            navigate(user.isAdmin ? '/products' : '/')
        } else {
            setLoginError('Invalid email or password. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">

                
                <div className="bg-white rounded-3xl shadow-xl shadow-violet-100/50 border border-zinc-100 p-8 md:p-10">

                    
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200 mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-900">Welcome back</h1>
                        <p className="text-zinc-500 text-sm mt-1">Sign in to your LuxeCart account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                       
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                    })}
                                    className={`w-full pl-10 pr-4 py-3 bg-zinc-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all ${errors.email ? 'border-rose-400 focus:border-rose-400' : 'border-zinc-200 focus:border-violet-400'}`}
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-xs mt-1.5">{errors.email.message}</p>}
                        </div>

                        
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-zinc-700">Password</label>
                                <a href="#" className="text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Minimum 6 characters" }
                                    })}
                                    className={`w-full pl-10 pr-10 py-3 bg-zinc-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all ${errors.password ? 'border-rose-400 focus:border-rose-400' : 'border-zinc-200 focus:border-violet-400'}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-rose-500 text-xs mt-1.5">{errors.password.message}</p>}
                        </div>

                        
                        {loginError && (
                            <div className="px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm font-medium">
                                {loginError}
                            </div>
                        )}

                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-violet-600 rounded" />
                            <span className="text-sm text-zinc-600">Remember me for 30 days</span>
                        </label>

                        
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 shadow-md shadow-violet-200 transition-all duration-200 mt-1"
                        >
                            Sign In
                        </button>
                    </form>

                    
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100" /></div>
                        <div className="relative text-center"><span className="bg-white px-3 text-xs text-zinc-400">or continue with</span></div>
                    </div>

                    
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-2.5 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
                            <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            Facebook
                        </button>
                    </div>

                    <p className="text-center text-sm text-zinc-500 mt-6">
                        Don't have an account?{' '}
                        <NavLink to="/register" className="font-semibold text-violet-600 hover:text-violet-700 transition-colors">Create one</NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login