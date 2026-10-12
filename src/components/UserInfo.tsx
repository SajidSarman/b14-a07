
'use client';

import React from 'react';
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';


const UserInfo = () => {
    const { data: session } = authClient.useSession(); 
    const user = session?.user;

    const handleSignOut = async () => {
        try {
            const result = await authClient.signOut();
            if (result.error) {
                toast.error(result.error.message ?? 'সাইন আউট করা যায়নি। আবার চেষ্টা করুন।');
                return;
            }

            toast.success('সাইন আউট সফল হয়েছে।');
        } catch (error) {
            console.error("Sign out process failed:", error);
            toast.error(error instanceof Error
                ? error.message
                : 'সাইন আউট করা যায়নি। আবার চেষ্টা করুন।');
        }
    };

    return (
        <div>
            {user ? (
                <ProfileDropdown 
                    user={{
                        name: user.name || "ব্যবহারকারী",
                        email: user.email || "",
                        image: user.image || undefined
                    }} 
                    onSignOut={handleSignOut}
                />
            ) : (
                <div className="flex shrink-0 items-center gap-2 sm:gap-6">
                    <Link 
                        href="/sign-in" 
                        className="whitespace-nowrap text-xs font-medium text-gray-800 transition-colors hover:text-[#05893e] sm:text-base"
                    >
                        সাইন ইন
                    </Link>

                    <Link 
                        href="/sign-up" 
                        className="whitespace-nowrap rounded-lg bg-[#05893e] px-3 py-2 text-xs font-medium text-white shadow-md transition-all hover:bg-[#007038] sm:px-6 sm:py-2.5 sm:text-base"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
