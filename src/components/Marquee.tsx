import { IProductInfo } from '@/types/ProductInfo';
import React from 'react';
import Marquee from "react-fast-marquee";

// interface Headlines { 
//     id: number; 
//     image?: string; 
//     categoryIcon?: string; 
//     nameBn: string; 
//     today: number; 
//     unit: string; 
//     change?: { dir: 'up' | 'down' | 'flat'; pct: number }
// }

const MarketMarquee = async() => {
    let data: IProductInfo[];
    try {
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
        // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            throw new Error(`Products API returned ${res.status}`);
        }

        data = await res.json();
    } catch (error) {
        console.error('Failed to load market ticker:', error);
        return (
            <div className="w-full border-y border-gray-200 bg-gray-50 py-2 text-center text-sm text-gray-500">
                বাজারদর এখন পাওয়া যাচ্ছে না।
            </div>
        );
    }

    const topTen = data.slice(0, 10)
    

    return (
        <div className="w-full border-y border-gray-200 py-2 bg-gray-50">
        
            <Marquee speed={80} pauseOnHover={true} gradient={false}>
                
                {topTen.map((item) => {
    
                    const isUp = item.change?.dir === 'up';
                    const isDown = item.change?.dir === 'down';
                    

                    let trendColor = 'text-gray-500';
                    let trendSymbol = '—';
                    
                    if (isUp) {
                        trendColor = 'text-red-600 font-bold';
                        trendSymbol = '▲';
                    } else if (isDown) {
                        trendColor = 'text-green-600 font-bold';
                        trendSymbol = '▼';
                    }

                   
                    const displayUnit = item.unit === 'kg' ? 'কেজি' : item.unit === 'litre' ? 'লিটার' : item.unit;

                    const banglaPrice = Number(item.today).toLocaleString('bn-BD'); 
                    const banglaPercentage = Number(Math.abs(item.change?.pct ?? 0)).toLocaleString('bn-BD', {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1
                    });

                    return (
                        <div key={item.id} className="flex items-center gap-3 text-sm font-medium text-gray-800 mx-6 select-none">
                        
                            <span className="text-base">{item.image || item.categoryIcon}</span>
                            
                        
                            <span className="font-semibold text-gray-900">{item.nameBn}</span>
                            
                        
                            <span className="text-gray-900 font-normal">
                                {banglaPrice} টাকা/{displayUnit}
                            </span>
                            
                        
                            <span className={`${trendColor} text-xs flex items-center gap-0.5`}>
                                <span>{trendSymbol}</span>
                                <span>{banglaPercentage}%</span>
                            </span>
                        </div>
                    )
                    // return (
                    //     <div 
                    //         key={item.id} 
                    //         className="flex items-center gap-3 text-sm font-medium text-gray-800 mx-6 select-none"
                    //     >

                    //         <span className="text-base">{item.image || item.categoryIcon}</span>
                            

                    //         <span className="font-semibold text-gray-900">{item.nameBn}</span>
                            
                            
                    //         <span className="text-gray-500 font-normal">
                    //             {item.today} টাকা/{displayUnit}
                    //         </span>
                            

                    //         <span className={`${trendColor} text-xs flex items-center gap-0.5`}>
                    //             <span>{trendSymbol}</span>
                    //             <span>{Math.abs(item.change?.pct ?? 0).toFixed(1)}%</span>
                    //         </span>
                    //     </div>
                    // );
                })}
            </Marquee>
        </div>
    )
};

export default MarketMarquee;