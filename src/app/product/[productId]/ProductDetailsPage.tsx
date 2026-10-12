import { IProductInfo } from '@/types/ProductInfo';
import { notFound } from 'next/navigation';
import React from 'react';

interface PageProps {
    params: Promise<{ productId: string }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
    const { productId } = await params;

    let item: IProductInfo | null;
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productId}`, {
            // const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${productId}`, {
            // const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${productId}`, {
            next: { revalidate: 60 }
        });

        item = res.status === 404 ? null : await res.json();

        if (!res.ok && res.status !== 404) {
            throw new Error(`Product request failed: ${res.status}`);
        }
    } catch (error) {
        console.error(`Failed to load product ${productId}:`, error);
        return (
            <p className="mx-auto w-full max-w-6xl px-4 py-8 text-center text-sm text-gray-600 sm:px-6">
                পণ্যের তথ্য এখন পাওয়া যাচ্ছে না। পরে আবার চেষ্টা করুন।
            </p>
        );
    }

    if (!item) {
        notFound();
    }


    const displayUnit = item.unit === 'kg' ? 'কেজি' : item.unit === 'litre' ? 'লিটার' : item.unit;
    const minPrice = Math.min(...item.markets.map(m => m.min));
    const maxPrice = Math.max(...item.markets.map(m => m.max));
    const priceDiff = item.today - item.yesterday;

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-5 text-[#1a1a1a] sm:px-6 sm:py-6">

            {/* navigation */}
            <div className="text-xs text-gray-600">
                হোম › {item.categoryNameBn} › <span className="text-gray-800 font-bold">{item.nameBn}</span>
            </div>


            <div className="flex flex-col items-stretch justify-between gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 md:flex-row md:items-center">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f4f6f4] text-3xl sm:h-16 sm:w-16 sm:text-4xl">
                        {item.image || item.categoryIcon}
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-xl font-black sm:text-2xl">{item.nameBn}</h1>
                        <p className="mt-1 text-xs font-medium text-gray-600">প্রতি {displayUnit} • {item.categoryNameBn}</p>
                        <p className="mt-2 text-xs font-medium ">
                            {priceDiff > 0
                                ? `গতকালের তুলনায় আজ দাম বেড়েছে • ${priceDiff.toLocaleString('bn-BD')} টাকা`
                                : `গতকালের তুলনায় আজ দাম কমেছে • ${Math.abs(priceDiff).toLocaleString('bn-BD')} টাকা`
                            }
                        </p>
                    </div>
                </div>

                <div className="flex w-full min-w-32.5 flex-col rounded-2xl border border-gray-50 bg-[#f4f6f4]/70 p-4 text-center md:w-auto">
                    <span className="text-[10px] font-bold tracking-wider text-gray-600">আজকের দাম</span>
                    <span className="mt-0.5 text-3xl font-black">{item.today.toLocaleString('bn-BD')}</span>
                    <span className="mt-0.5 text-[10px] font-bold text-gray-600">টাকা / {displayUnit}</span>
                </div>
            </div>


            <div className="space-y-2">
                <h2 className="text-sm font-bold text-gray-800 px-1">দামের সারসংক্ষেপ</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                        <span className="text-[11px] text-gray-800 block font-medium">সর্বনিম্ন দাম</span>
                        <span className="text-xl font-black text-green-600 block mt-1">{minPrice.toLocaleString('bn-BD')} টাকা</span>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                        <span className="text-[11px] text-gray-800 block font-medium">সর্বাধিক দাম</span>
                        <span className="text-xl font-black text-red-600 block mt-1">{maxPrice.toLocaleString('bn-BD')} টাকা</span>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                        <span className="text-[11px] text-gray-800 block font-medium">গড় দাম</span>
                        <span className="text-xl font-black text-gray-800 block mt-1">{Math.round(item.today).toLocaleString('bn-BD')} টাকা</span>
                    </div>
                </div>
            </div>


            {/* main list */}
            <div className="space-y-2">
                <h2 className="text-sm font-bold text-gray-800 px-1">বাজারভিত্তিক আজকের দাম</h2>
                <div className="overflow-x-auto rounded-[20px] border border-gray-100 bg-white shadow-sm">
                    <div className="min-w-170">
                        <div className="grid grid-cols-5 gap-5 border-b border-gray-400 bg-gray-100 px-5 py-3 text-[11px] font-bold tracking-wider text-gray-700">
                            <div>বাজার</div>
                            <div>বিভাগ</div>
                            <div className="text-right">সর্বনিম্ন</div>
                            <div className="text-right">সর্বাধিক</div>
                            <div className="text-right">গড়</div>
                        </div>

                        <div className="divide-y divide-gray-400 ">
                            {item.markets.map((m, i) => (
                                <div key={i} className="grid grid-cols-5 items-center gap-5 px-5 py-3.5 text-xs text-gray-600 hover:bg-gray-50">
                                    <div className="font-bold text-gray-800 truncate">{m.market}</div>
                                    <div className="font-bold">{m.division}</div>
                                    <div className="text-right font-bold">{m.min.toLocaleString('bn-BD')} টাকা</div>
                                    <div className="text-right font-bold">{m.max.toLocaleString('bn-BD')} টাকা</div>
                                    <div className="text-right font-bold text-gray-900">{Math.round((m.min + m.max) / 2).toLocaleString('bn-BD')} টাকা</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductDetailsPage;