import Link from 'next/link';
import React from 'react';

interface Navs {
    id: string,
    slug: string,
    nameBn: string,
    icon: string
}

const NavLink = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
    // const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories", {
    // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories", {
        next: { revalidate: 60 }
    })
    const data: Navs[] = await res.json()
    // console.log("data from api: ", data)
    return (
        <div className="mx-auto flex w-full max-w-6xl gap-5 overflow-x-auto px-4 py-2 sm:gap-10 sm:px-6">
            {data.map(item => <Link key={item.id} href={`/category/${item.slug}`} className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-800 transition-colors hover:text-gray-600 sm:text-base">
                <div>{item.icon}</div>
                {item.nameBn}
            </Link>)}
        </div>
    );
};

export default NavLink;