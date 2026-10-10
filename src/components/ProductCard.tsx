import { IProductInfo } from '@/types/ProductInfo';
import Link from 'next/link';
import React from 'react';


// interface Headlines {
//     id: number;
//     image?: string;
//     categoryIcon?: string;
//     nameBn: string;
//     today: number;
//     unit: string;
//     change?: {
//         dir: 'up' | 'down' | 'flat';
//         pct: number;
//     };
// }


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


const ProductCard = ({ item }: { item: IProductInfo }) => {
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
            href={`/product/${item.id}`}
            className="block cursor-pointer rounded-[20px] border border-gray-100 bg-[#fcfdfc] p-4 transition-all duration-200 shadow-sm hover:shadow-lg sm:p-5"
        >
            <div className="flex min-w-0 items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f4f6f4] flex items-center justify-center text-2xl shrink-0">
                    {item.image || item.categoryIcon}
                </div>
                <div className="min-w-0">
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

            <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xl font-extrabold sm:text-2xl">
                    {banglaPrice} <span className="ml-0.5 text-base font-normal text-gray-800 sm:text-lg">টাকা</span>
                </span>

                <div className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-xs font-bold sm:px-3 ${badgeColor}`}>
                    <span>{trendSymbol}</span>
                    <span>{banglaPercentage}%</span>
                </div>
            </div>
        </Link>
    );

};
export default ProductCard;