'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface UserSession {
    name: string;
    email: string;
    image?: string;
}


const ProfileDropdown = ({ user, onSignOut }: { user: UserSession; onSignOut: () => void }) => {
    const firstName = user.name.split(' ')[0];
    return (
        <details className="relative inline-block text-left group">
            
            {/*Toggle Button*/}
            <summary className="flex items-center gap-3 px-2 py-1.5 cursor-pointer outline-none list-none group">
                
                <div className="w-10 h-10 rounded-[14px] overflow-hidden bg-gray-100 relative shrink-0 border border-gray-100 shadow-sm">
                    <Image
                        src={user.image || `https://api.dicebear.com/10.x/initials/svg?seed=${user.name}`}
                        alt="User profile avatar"
                        width={40}
                        height={40}
                        // unoptimized
                        className="object-cover w-full h-full"
                    />
                </div>
                
                <span className="text-base font-semibold text-gray-800 tracking-wide">
                    {firstName}
                </span>

                <svg 
                    className="w-2.5 h-2.5 text-gray-400 group-open:rotate-180 transition-transform duration-200" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                >
                    <path d="M12 21l-12-18h24z" />
                </svg>
            </summary>

            {/* outside click*/}
            <div 
                className="fixed inset-0 z-40 cursor-default" 
                onClick={(e) => {
                    const detailsElement = e.currentTarget.parentElement as HTMLDetailsElement;
                    if (detailsElement) detailsElement.open = false;
                }}
            />

            <div className="absolute right-0 w-54 bg-white border border-gray-100 rounded-[20px] p-5 shadow-xl z-50 cursor-default animate-in fade-in slide-in-from-top-1 duration-100">
                
                <div className="mb-3">
                    <h2 className="text-base font-bold text-gray-900 truncate">{user.name}</h2>
                    <p className="text-xs text-gray-600 font-medium truncate mt-0.5">{user.email}</p>
                </div>

                {/* profile*/}
                <div className="flex flex-col gap-1">
                    <Link
                        href="/profile"
                        onClick={(e) => {
                            const detailsElement = e.currentTarget.closest('details');
                            if (detailsElement) detailsElement.open = false;
                        }}
                        className="flex items-center gap-2.5 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <span>👤</span>
                        <span>আমার প্রোফাইল</span>
                    </Link>

                    <button
                        onClick={(e) => {
                            const detailsElement = e.currentTarget.closest('details');
                            if (detailsElement) detailsElement.open = false;
                            onSignOut();
                        }}
                        className="flex items-center gap-2.5 py-2 rounded-xl text-sm  text-red-500 hover:bg-red-50/40 transition-colors w-full text-left cursor-pointer"
                    >
                        <span className='px-1'>↩</span>
                        <span>সাইন আউট</span>
                    </button>
                </div>

            </div>
        </details>
    );
}

export default ProfileDropdown;