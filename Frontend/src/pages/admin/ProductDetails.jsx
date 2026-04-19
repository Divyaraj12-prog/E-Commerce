import React from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { asyncUpdateProduct, asyncDeleteProduct } from '../../store/actions/productAction'
import { asyncAddToCart } from '../../store/actions/cartAction'

const CATEGORIES = ["men's clothing", "women's clothing", "electronics", "jewelery"]

const ProductDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { productReducer: { products }, userReducer: { users } } = useSelector(state => state)
    const product = products?.find((product) => product.id == id)
    

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: product ? {
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            "rating.rate": product.rating?.rate,
            "rating.count": product.rating?.count,
        } : {}
    })

    const imageUrl = watch("image")

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center text-zinc-500">
            Product not found. <NavLink to="/products" className="ml-2 text-violet-600 underline">Back to products</NavLink>
        </div>
    )

    const onSubmit = async (data) => {
        await dispatch(asyncUpdateProduct(id, {
            ...data,
            price: parseFloat(data.price),
            rating: { rate: parseFloat(data["rating.rate"]) || 0, count: parseInt(data["rating.count"]) || 0 },
        }))
        navigate('/products')
    }

    const handleAddToCart = (product) => {
        if (!users) { navigate('/login'); return }
        dispatch(asyncAddToCart(product))
    }

    const handleDelete = async () => {
        if (window.confirm('Delete this product permanently?')) {
            await dispatch(asyncDeleteProduct(id))
            navigate('/products')
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                
                <div className="flex items-center gap-3 mb-8">
                    <NavLink to="/products" className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-500 hover:text-violet-600 hover:border-violet-200 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </NavLink>
                    <div>
                        <div className="flex items-center gap-2">
                            {users?.isAdmin ? (
                                <>
                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Admin · Edit</span>
                                    <h1 className="text-2xl font-bold text-zinc-900">Update Product</h1>
                                </>
                            ) : (
                                <>
                                    <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">Product</span>
                                    <h1 className="text-2xl font-bold text-zinc-900">{product.title}</h1>
                                </>
                            )}
                        </div>
                        <p className="text-zinc-500 text-sm">
                            Product ID: <span className="font-medium text-zinc-700">#{product.id}</span>
                        </p>
                    </div>
                </div>

                {users?.isAdmin ? (
                    <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            
                            <div className="flex gap-4 items-start flex-col sm:flex-row">
                                <div className="w-full sm:w-36 h-36 bg-zinc-50 border-2 border-dashed border-violet-200 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="preview" className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <div className="text-center text-zinc-300">
                                            <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 w-full">
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Image URL <span className="text-rose-500">*</span></label>
                                    <input
                                        type="url"
                                        {...register("image", { required: "Image URL is required" })}
                                        className={`w-full px-4 py-3 bg-zinc-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all ${errors.image ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-400'}`}
                                    />
                                    {errors.image && <p className="text-rose-500 text-xs mt-1">{errors.image.message}</p>}
                                </div>
                            </div>

                            
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Product Title <span className="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Title is required", minLength: { value: 5, message: "Min 5 characters" } })}
                                    className={`w-full px-4 py-3 bg-zinc-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all ${errors.title ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-400'}`}
                                />
                                {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>

                            
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Description <span className="text-rose-500">*</span></label>
                                <textarea
                                    rows={4}
                                    {...register("description", { required: "Description is required" })}
                                    className={`w-full px-4 py-3 bg-zinc-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all resize-none ${errors.description ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-400'}`}
                                />
                                {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description.message}</p>}
                            </div>

                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Price (USD) <span className="text-rose-500">*</span></label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-medium text-sm">$</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            {...register("price", { required: "Price is required", min: { value: 0.01, message: "Must be > 0" } })}
                                            className={`w-full pl-8 pr-4 py-3 bg-zinc-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all ${errors.price ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-400'}`}
                                        />
                                    </div>
                                    {errors.price && <p className="text-rose-500 text-xs mt-1">{errors.price.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Category <span className="text-rose-500">*</span></label>
                                    <select
                                        {...register("category", { required: "Category is required" })}
                                        className={`w-full px-4 py-3 bg-zinc-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all text-zinc-700 ${errors.category ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-400'}`}
                                    >
                                        <option value="">Select category</option>
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category.message}</p>}
                                </div>
                            </div>

                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Rating <span className="text-zinc-400">(0–5)</span></label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        {...register("rating.rate")}
                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-violet-400 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Rating Count</label>
                                    <input
                                        type="number"
                                        min="0"
                                        {...register("rating.count")}
                                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-violet-400 transition-all"
                                    />
                                </div>
                            </div>

                           
                            <div className="border border-rose-100 bg-rose-50/50 rounded-2xl p-4 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-rose-700">Danger Zone</p>
                                    <p className="text-xs text-rose-500 mt-0.5">Permanently delete this product from the store</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-rose-600 text-white text-sm font-semibold rounded-xl hover:bg-rose-700 transition-colors shrink-0"
                                >
                                    Delete Product
                                </button>
                            </div>

                            
                            <div className="flex gap-3 pt-2 border-t border-zinc-100">
                                <NavLink
                                    to="/products"
                                    className="flex-1 py-3.5 border border-zinc-200 text-zinc-700 font-semibold rounded-xl text-center hover:bg-zinc-50 transition-colors text-sm"
                                >
                                    Discard Changes
                                </NavLink>
                                <button
                                    type="submit"
                                    className="flex-1 py-3.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 shadow-md shadow-violet-200 transition-all text-sm flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">
                        <div className="grid sm:grid-cols-[180px_1fr] gap-6 items-start">
                            <div className="w-full h-44 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center overflow-hidden">
                                <img src={product.image} alt={product.title} className="w-full h-full object-contain p-3" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-2">{product.category}</p>
                                <h2 className="text-xl font-bold text-zinc-900">{product.title}</h2>
                                <p className="text-zinc-600 mt-3 text-sm leading-6">{product.description}</p>
                                <div className="mt-4 flex items-center gap-4">
                                    <p className="text-2xl font-bold text-zinc-900">${product.price}</p>
                                    <p className="text-sm text-zinc-500">⭐ {product.rating?.rate || 0} ({product.rating?.count || 0})</p>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-6 flex items-center gap-1.5 px-4 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetails
