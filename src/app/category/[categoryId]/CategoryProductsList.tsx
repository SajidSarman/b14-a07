'use client';

import ProductCard from "@/components/ProductCard";
import { IProductInfo } from "@/types/ProductInfo";
import { useState } from "react";

interface ListType {
    products: IProductInfo[]
}


const CategoryProductsList = ({ products }: ListType) => {
    const [sortBy, setSortBy] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

    // const sortedProducts = [...products].sort((a, b) => {
    //     if (sortBy === 'low-to-high') return a.today - b.today;
    //     if (sortBy === 'high-to-low') return b.today - a.today;
    //     return 0;
    // });

    const sortedProducts = [...products].sort((a, b) => {
        const priceA = Number(a.today) || 0;
        const priceB = Number(b.today) || 0;

        if (sortBy === 'low-to-high') return priceA - priceB;
        if (sortBy === 'high-to-low') return priceB - priceA;
        return 0; // 'default'
    });


    const totalCountBn = products.length.toLocaleString('bn-BD');

    return (
        <div className="space-y-4">

            <div className="flex w-full items-center justify-end rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <span>সাজান</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="min-w-0 max-w-[calc(100vw-5rem)] cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs font-bold text-gray-800 outline-none sm:px-3"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low-to-high">দাম: কম থেকে বেশি</option>
                        <option value="high-to-low">দাম: বেশি থেকে কম</option>
                    </select>
                </div>
            </div>


            <p className="text-xs text-gray-400 font-bold tracking-wide px-1 select-none">
                মোট {totalCountBn}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default CategoryProductsList;