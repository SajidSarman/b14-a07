'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import UpdateNameForm from './UpdateNameForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProfilePage = () => {

    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    
    useEffect(() => {
        if (!isPending && !session?.user) {
            router.replace('/sign-in');
        }
    }, [isPending, session?.user, router]);

    const handleSignOut = async () => {
        const result = await authClient.signOut();

        if (result.error) {
            toast.error(result.error.message ?? 'সাইন আউট করা যায়নি।');
            return;
        }

        toast.success('সাইন আউট সফল হয়েছে।');
    };

    return (
        <main className="flex w-full flex-1 justify-center bg-[#f0f5f0] px-4 py-10 sm:px-6">
            <section className="w-full max-w-lg">
                <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

                <div>
                    {isPending ? (
                        <p className="text-sm text-gray-500">লোড হচ্ছে…</p>
                    ) : session?.user ? (
                        <>
                            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-[#e1e9e2] bg-white/80 p-4 shadow-sm sm:p-5">
                                <Image
                                    src={session.user.image || `https://api.dicebear.com/10.x/initials/svg?seed=${session.user.name}`}
                                    alt="Profile picture"
                                    width={56}
                                    height={56}
                                    unoptimized
                                    className="h-14 w-14 rounded-xl object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-semibold text-gray-900">{session.user.name}</p>
                                    <p className="truncate text-sm text-gray-500">{session.user.email}</p>
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="shrink-0 rounded-lg border bg-red-50 border-red-300 px-3 py-2 text-xs text-red-600 sm:text-sm"
                                >
                                    <span className="pr-1">↩</span>
                                    <span>সাইন আউট</span>
                                </Button>
                            </div>

                            <div className="mt-4 rounded-2xl border border-[#e1e9e2] bg-white/80 p-5 shadow-sm sm:p-6">
                                <h2 className="mb-5 font-semibold text-gray-800">তথ্য পরিবর্তন</h2>
                                <UpdateNameForm currentName={session.user.name} />
                            </div>
                        </>
                    ) : (
                        <p className="mt-2 text-sm text-gray-600">সাইন ইন পেজে পাঠানো হচ্ছে…</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default ProfilePage;