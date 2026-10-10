'use client';

import ProductCard from "@/components/ProductCard";
import { IProductInfo } from "@/types/ProductInfo";
import { useState } from "react";

interface ListType {
    products: IProductInfo[]
}


const CategoryProductsList = ({ products }: ListType) => {
    const [sortBy, setSortBy] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'low-to-high') return a.today - b.today;
        if (sortBy === 'high-to-low') return b.today - a.today;
        return 0;
    });

    const totalCountBn = products.length.toLocaleString('bn-BD');

    return (
        <div className="space-y-4">

            <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex justify-end items-center shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <span>সাজান</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-3 py-1.5 font-bold cursor-pointer outline-none text-xs"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default CategoryProductsList;