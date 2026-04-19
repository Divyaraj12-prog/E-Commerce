import {loadProducts} from "../reducers/productSlice";
import productsData from "../../data/productsData";

const PRODUCTS_KEY = 'products_state';

const getSavedProducts = () => {
    try {
        const raw = localStorage.getItem(PRODUCTS_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const saveProducts = (products) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const asyncLoadProducts = () => async (dispatch, getState) => {
    const existingProducts = getState().productReducer.products;
    if (existingProducts.length > 0) return;
    const saved = getSavedProducts();
    const initialProducts = saved && saved.length ? saved : productsData;
    dispatch(loadProducts(initialProducts));
    saveProducts(initialProducts);
}

export const asyncCreateProduct = (productData) => async (dispatch, getState) => {
    const products = getState().productReducer.products;
    const product = {
        ...productData,
        price: Number(productData.price),
        rating: {
            rate: Number(productData?.rating?.rate ?? productData['rating.rate'] ?? 0),
            count: Number(productData?.rating?.count ?? productData['rating.count'] ?? 0)
        }
    };
    const updatedProducts = [...products, product];
    dispatch(loadProducts(updatedProducts));
    saveProducts(updatedProducts);
}

export const asyncUpdateProduct = (id, productData) => async (dispatch, getState) => {
    const products = getState().productReducer.products;
    const updatedProducts = products.map((p) => {
        if (String(p.id) !== String(id)) return p;
        return {
            ...p,
            ...productData,
            price: Number(productData.price),
            rating: {
                rate: Number(productData?.rating?.rate ?? productData['rating.rate'] ?? p.rating?.rate ?? 0),
                count: Number(productData?.rating?.count ?? productData['rating.count'] ?? p.rating?.count ?? 0)
            }
        };
    });
    dispatch(loadProducts(updatedProducts));
    saveProducts(updatedProducts);
}

export const asyncDeleteProduct = (id) => async (dispatch, getState) => {
    const products = getState().productReducer.products;
    const updatedProducts = products.filter((p) => String(p.id) !== String(id));
    dispatch(loadProducts(updatedProducts));
    saveProducts(updatedProducts);
}