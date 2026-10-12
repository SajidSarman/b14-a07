import React from 'react';
import ProductCard from './ProductCard';
import { IProductInfo } from '@/types/ProductInfo';



const Cards = async() => {
    let data: IProductInfo[];
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
        // const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
        // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            throw new Error(`Products API returned ${res.status}`);
        }

        data = await res.json();
    } catch (error) {
        console.error('Failed to load products:', error);
        return (
            <p className="mx-auto w-full max-w-6xl px-4 py-8 text-center text-sm text-gray-600 sm:px-6">
                পণ্যের তথ্য এখন পাওয়া যাচ্ছে না। পরে আবার চেষ্টা করুন।
            </p>
        );
    }

    const upProducts = data
        .filter(item => item.change?.dir === 'up')
        .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
        .slice(0, 6);


    const downProducts = data
        .filter(item => item.change?.dir === 'down')
        .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
        .slice(0, 6);

    
    const totalProducts = data.length.toLocaleString('bn-BD');

    return (
        <div id="সব-পণ্য" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
       

            {upProducts.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-lg font-bold text-red-600 flex items-center gap-2 mb-4">
                        <span>▲</span> আজ দাম বেড়েছে
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {upProducts.map((item) => (
                            <ProductCard key={`up-${item.id}`} item={item} />
                        ))}
                    </div>
                </section>
            )}


            {downProducts.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-lg font-bold text-green-700 flex items-center gap-2 mb-4">
                        <span>▼</span> আজ দাম কমেছে
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {downProducts.map((item) => (
                            <ProductCard key={`down-${item.id}`} item={item} />
                        ))}
                    </div>
                </section>
            )}

            {/* All Products */}
            <section>
                <div className="mb-4">
                    <h2 className="text-xl font-extrabold text-gray-900">সব পণ্য</h2>
                    <p className="text-sm text-gray-500 mt-0.5">মোট {totalProducts}টি পণ্য দেখানো হচ্ছে</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((item) => (
                        <ProductCard key={`all-${item.id}`} item={item} />
                    ))}
                </div>
            </section>
        </div>
    );
};


export default Cards;