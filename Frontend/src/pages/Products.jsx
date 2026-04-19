import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = ["All", "Men's clothing", "Women's clothing", "Electronics", "Jewelery"]

const StarRating = ({ rate }) => (
    <div className="flex gap-0.5 items-center">
        {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} className={`w-3 h-3 ${s <= Math.round(rate) ? 'text-amber-400' : 'text-zinc-200'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
        <span className="text-zinc-400 text-xs ml-1">{rate}</span>
    </div>
)

const Products = () => {
    const products = useSelector(state => state.productReducer.products)
    const navigate = useNavigate()

    const [selectedCategory, setSelectedCategory] = useState("All")
    const [sortBy, setSortBy] = useState("default")
    const [priceRange, setPriceRange] = useState(1000)
    const [searchQuery, setSearchQuery] = useState("")
    const [view, setView] = useState("grid")

    

    const handleProductDetails = (productId) => {
        navigate(`/product/${productId}`)
    }

    const filtered = products
        .filter(p => selectedCategory === "All" || p.category === selectedCategory)
        .filter(p => p.price <= priceRange)
        .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice()
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price
            if (sortBy === 'price-desc') return b.price - a.price
            if (sortBy === 'rating') return b.rating.rate - a.rating.rate
            return 0
        })

    return (
        <div className="min-h-screen bg-zinc-50">
            
            <div className="bg-linear-to-r from-violet-600 to-indigo-600 py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-1">All Products</h1>
                    <p className="text-violet-200 text-sm">{filtered.length} products found</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">

                
                <aside className="w-full lg:w-64 shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 sticky top-20">
                        <h2 className="font-bold text-zinc-900 mb-5 text-lg">Filters</h2>

                       
                        <div className="mb-6">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Search</label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 transition-colors"
                                />
                            </div>
                        </div>

                        
                        <div className="mb-6">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 block">Category</label>
                            <div className="flex flex-col gap-2">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                                            selectedCategory === cat
                                                ? 'bg-violet-100 text-violet-700'
                                                : 'text-zinc-600 hover:bg-zinc-50'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        
                        <div className="mb-6">
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 block">
                                Price Range — <span className="text-violet-600">${priceRange}</span>
                            </label>
                            <input
                                type="range"
                                min={5}
                                max={200}
                                value={priceRange}
                                onChange={e => setPriceRange(Number(e.target.value))}
                                className="w-full accent-violet-600"
                            />
                            <div className="flex justify-between text-xs text-zinc-400 mt-1">
                                <span>$5</span><span>$200</span>
                            </div>
                        </div>

                        
                        <div>
                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 block">Min Rating</label>
                            {[4, 3, 2].map(r => (
                                <button key={r} className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-zinc-50 transition-colors">
                                    <StarRating rate={r} />
                                    <span className="text-xs text-zinc-500">& up</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                
                <div className="flex-1">
                    
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <p className="text-sm text-zinc-500">Showing <span className="font-semibold text-zinc-800">{filtered.length}</span> results</p>
                        <div className="flex items-center gap-3">
                            
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="px-3 py-2 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-700 focus:outline-none focus:border-violet-400"
                            >
                                <option value="default">Sort: Default</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                            
                            <div className="flex gap-1 bg-white border border-zinc-200 rounded-xl p-1">
                                <button onClick={() => setView("grid")} className={`p-1.5 rounded-lg transition-colors ${view === 'grid' ? 'bg-violet-100 text-violet-600' : 'text-zinc-400 hover:text-zinc-600'}`}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                </button>
                                <button onClick={() => setView("list")} className={`p-1.5 rounded-lg transition-colors ${view === 'list' ? 'bg-violet-100 text-violet-600' : 'text-zinc-400 hover:text-zinc-600'}`}>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-zinc-400">
                            <svg className="w-16 h-16 mx-auto mb-4 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <p className="font-medium text-lg">No products found</p>
                            <p className="text-sm">Try adjusting your filters</p>
                        </div>
                    ) : view === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filtered.map(product => (
                                <div key={product.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md overflow-hidden group transition-all duration-300">
                                    <div className="relative bg-zinc-50 h-52 flex items-center justify-center p-4 overflow-hidden">
                                        <img src={product.image} alt={product.title} className="h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                        <span className="absolute top-0 left-5 px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full capitalize">{product.category}</span>
                                        <button className="absolute top-3 right-3 p-1.5 bg-white rounded-xl shadow-sm text-zinc-400 hover:text-rose-500 transition-colors">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-zinc-800 line-clamp-2 mb-2 leading-snug">{product.title}</h3>
                                        <StarRating rate={product.rating.rate} />
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-xl font-bold text-violet-700">${product.price}</span>
                                            
                                            <button onClick={() => handleProductDetails(product.id)} className="flex items-center gap-1.5 px-3 py-2 bg-violet-600 text-white text-xs font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-sm">
                                                See Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        
                        <div className="flex flex-col gap-4">
                            {filtered.map(product => (
                                <div key={product.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md p-4 flex gap-4 items-center group transition-all duration-300">
                                    <div className="w-24 h-24 bg-zinc-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden p-2">
                                        <img src={product.image} alt={product.title} className="h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-xs font-semibold text-violet-600 capitalize">{product.category}</span>
                                        <h3 className="text-sm font-semibold text-zinc-800 line-clamp-1 mt-0.5">{product.title}</h3>
                                        <StarRating rate={product.rating.rate} />
                                        <p className="text-xs text-zinc-400 mt-1">{product.rating.count} reviews</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <span className="text-lg font-bold text-violet-700">${product.price}</span>
                                        <button onClick={() => handleProductDetails(product.id)} className="flex items-center gap-1.5 px-3 py-2 bg-violet-600 text-white text-xs font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-sm">
                                                See Details
                                            </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Products