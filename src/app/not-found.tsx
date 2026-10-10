import Link from 'next/link';
import React from 'react';

const GlobalNotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center font-sans select-none px-4 bg-[#f8faf7]">
            <span className="text-7xl block mb-6">🔍</span>
            <h1 className="text-2xl font-black text-gray-900 mb-2">পেজটি খুঁজে পাওয়া যায়নি!</h1>
            <p className="text-sm text-gray-500 mb-6 max-w-sm">
                দুঃখিত, আপনি যে ইউআরএলটি খুঁজছেন তা এই মুহূর্তে আমাদের সার্ভারে নেই অথবা এটি পরিবর্তিত হয়েছে।
            </p>
            <Link 
                href="/" 
                className="px-6 py-3 bg-[#007f3e] hover:bg-[#006632] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default GlobalNotFound;