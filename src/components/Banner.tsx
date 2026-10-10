import Image from 'next/image';
import React, { Suspense } from 'react';
import CurrentDate from './CurrentDate';

const Banner = () => {
    return (
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="relative my-4 flex w-full select-none flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-gray-100 bg-[#f7f9f6] p-5 sm:my-5 sm:items-center shadow-sm sm:gap-8 sm:p-7 md:flex-row">

                <div className="flex-1 flex flex-col items-start text-left">

                    <div className="inline-block px-3 py-1 bg-[#e7f4e9] text-[#1e5631] text-xs md:text-sm font-semibold rounded-full mb-4">
                        {<Suspense fallback={null}>
                                    <CurrentDate />
                                </Suspense>}
                    </div>

                    <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-[#111c14] sm:text-3xl md:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    <p className="mb-6 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <button className="cursor-pointer rounded-lg bg-[#05893e] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#006632] sm:px-6 sm:py-2.5 sm:text-sm">
                        সব পণ্য দেখুন
                    </button>
                </div>

                <div className="relative flex h-40 w-40 shrink-0 items-center justify-center self-center sm:h-48 sm:w-48 md:h-64 md:w-64">
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