import Link from 'next/link';
import React from 'react';

interface Navs {
    id: string,
    slug: string,
    nameBn: string,
    icon: string
}

const NavLink = async() => {
// const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories")
const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories")
const data: Navs[] = await res.json()
console.log("data from api: ", data)
    return (
        <div className='flex gap-10 py-2 pl-5 container mx-auto'>
            {data.map(item=> <Link key={item.id} href={`/${item.slug}`} className='flex items-center gap-2 text-gray-800 hover:text-gray-600 font-medium text-base transition-colors'>
            <div>{item.icon}</div>
                    {item.nameBn}
                    </Link> )}
        </div>
    );
};

export default NavLink;