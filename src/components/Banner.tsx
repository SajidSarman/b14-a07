import Image from 'next/image';
import React, { Suspense } from 'react';
import CurrentDate from './CurrentDate';

const Banner = () => {
    return (
        <div >
            <div className="w-full container mx-auto my-5 p-7 bg-[#f7f9f6] rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden select-none">

                <div className="flex-1 flex flex-col items-start text-left">

                    <div className="inline-block px-3 py-1 bg-[#e7f4e9] text-[#1e5631] text-xs md:text-sm font-semibold rounded-full mb-4">
                        {<Suspense fallback={null}>
                                    <CurrentDate />
                                </Suspense>}
                    </div>

                    <h1 className="text-2xl md:text-4xl font-extrabold text-[#111c14] tracking-tight mb-4 leading-tight">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <button className="px-6 py-2.5 bg-[#05893e] hover:bg-[#006632] text-white font-semibold text-sm rounded-lg transition-colors duration-200 cursor-pointer shadow-sm ">
                        সব পণ্য দেখুন
                    </button>
                </div>

                <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center relative shrink-0">
                    <Image
                        src="/bazar-hero.png" 
                        alt="Market Basket Illustration"
                        width={256}
                        height={256}
                        className="object-contain w-full h-full"
                    />
                </div>

            </div>
        </div>
    );
};

export default Banner;