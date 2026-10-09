import React from 'react';
import ProductCard from './ProductCard';


interface Headlines {
    id: number;
    image?: string;
    categoryIcon?: string;
    nameBn: string;
    today: number;
    unit: string;
    change?: { 
        dir: 'up' | 'down' | 'flat'; 
        pct: number; 
    };
}

const Cards = async() => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
        next: { revalidate: 60 }
    });
    const data: Headlines[] = await res.json();

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
        <div className="w-full max-w-7xl mx-auto px-4 py-8 min-h-screen">
       

            {upProducts.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-lg font-bold text-red-600 flex items-center gap-2 mb-4">
                        <span>▲</span> আজ দাম বেড়েছে
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item) => (
                        <ProductCard key={`all-${item.id}`} item={item} />
                    ))}
                </div>
            </section>
        </div>
    );
};


export default Cards;