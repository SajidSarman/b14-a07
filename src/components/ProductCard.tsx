import Link from 'next/link';
import React from 'react';


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


// translate
const getBenglaUnit = (unit: string): string => {
    const unitsMap: Record<string, string> = {
        'kg': 'প্রতি কেজি',
        'litre': 'প্রতি লিটার',
        'dozen': 'প্রতি ডজন',
        'piece': 'প্রতি পিস'
    };
    return unitsMap[unit.toLowerCase()] || `প্রতি ${unit}`;
};


const ProductCard = ({ item }: { item: Headlines }) => {
    const isUp = item.change?.dir === 'up';
    const isDown = item.change?.dir === 'down';


    let badgeColor = 'text-gray-500 bg-gray-100';
    let trendSymbol = '•';

    if (isUp) {
        badgeColor = 'text-red-600 bg-red-50';
        trendSymbol = '▲';
    } else if (isDown) {
        badgeColor = 'text-green-600 bg-green-50';
        trendSymbol = '▼';
    }

    const banglaPrice = Number(item.today).toLocaleString('bn-BD');
    const banglaPercentage = Number(Math.abs(item.change?.pct ?? 0)).toLocaleString('bn-BD', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    });


    return (
        <Link
            href={`/products/${item.id}`}
            className="block bg-[#fcfdfc] border border-gray-100 rounded-[20px] p-5 hover:shadow-sm transition-all duration-200 select-none cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f4f6f4] flex items-center justify-center text-2xl shrink-0">
                    {item.image || item.categoryIcon}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 truncate text-base leading-snug">
                        {item.nameBn}
                    </h3>
                    <p className="text-xs text-gray-800">
                        {getBenglaUnit(item.unit)}
                    </p>
                </div>
            </div>

            <div className="text-xs mt-5">
                আজকের দাম
            </div>

            <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-extrabold">
                    {banglaPrice} <span className="text-lg font-normal text-gray-800 ml-0.5">টাকা</span>
                </span>

                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${badgeColor}`}>
                    <span>{trendSymbol}</span>
                    <span>{banglaPercentage}%</span>
                </div>
            </div>
        </Link>
    );

};
export default ProductCard;