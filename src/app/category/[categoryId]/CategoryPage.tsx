import React from 'react';
import Link from 'next/link';
import { IProductInfo } from '@/types/ProductInfo';
import CategoryProductsList from './CategoryProductsList';
import { notFound } from 'next/navigation';


interface ListProps {
    dataPromise: Promise<{ categoryId: string }>;
}

const CategoryProductsPage = async ({ dataPromise }: ListProps) => {

    const { categoryId } = await dataPromise;

    // const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`, {
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`, {
    // const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${categoryId}`, {
    // const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${categoryId}`, {
        next: { revalidate: 60 }
    });
    const products: IProductInfo[] = await res.json();

    if (!products || products.length === 0) {
        // return (
        //     <div className="max-w-md mx-auto my-20 text-center select-none px-4">
        //         <span className="text-6xl block mb-4">🔍</span>
        //         <h1 className="text-xl font-bold text-gray-900 mb-2">দুঃখিত, কোনো পণ্য পাওয়া যায়নি!</h1>
        //         <p className="text-sm text-gray-400 mb-6">এই ক্যাটাগরিতে এই মুহূর্তে কোনো তথ্য নেই অথবা ইউআরএলটি সঠিক নয়।</p>
        //         <Link href="/" className="inline-block px-5 py-2.5 bg-[#007f3e] hover:bg-[#006632] text-white font-semibold text-sm rounded-lg transition-colors shadow-sm">
        //             হোম পেজে ফিরে যান
        //         </Link>
        //     </div>
        // );
        notFound();
    }


    const firstItem = products[0];
    const categoryTitleBn = firstItem?.categoryNameBn;
    const categoryIcon = firstItem?.categoryIcon;

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 select-none sm:p-6">
            
            <div className="text-xs text-gray-500">
                <Link href="/" className="hover:underline">হোম</Link>
                <span className="mx-2">›</span>
                <span className="text-gray-800 font-medium">{categoryTitleBn}</span>
            </div>


            <div className="w-full bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-[#f4f6f4] rounded-2xl flex items-center justify-center text-3xl shrink-0">
                    {categoryIcon}
                </div>
                <div>
                    <h1 className="text-xl font-black text-gray-900 leading-none">{categoryTitleBn}</h1>
                    <p className="text-xs text-gray-400 mt-1.5 font-medium">প্রতি পণ্যের আজকের দাম ও পরিবর্তন</p>
                </div>
            </div>

            <CategoryProductsList products={products} />
            
        </div>
    );
};

export default CategoryProductsPage;
