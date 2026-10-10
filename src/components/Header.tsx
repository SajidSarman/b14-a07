
import { Suspense } from "react";

import CurrentDate from "./CurrentDate";
import NavLink from "./NavLink";
import Link from "next/link";
import MarketMarquee from "./Marquee";

const Header = () => {

    // const date = new Date().toLocaleDateString("bn-BD", {
    //     dateStyle: "full"
    // })

    return (
        <div>
            <div className="border-b border-gray-200">

                <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-2 sm:px-6">
                    <div className="flex min-w-0 items-center gap-2">
                        <Link href="/" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#05893e] sm:h-12 sm:w-12">
                            <div className="text-xl">🛒</div>
                        </Link>
                        <div className="min-w-0">
                            <h1 className="text-lg font-bold sm:text-xl">বাজার দর</h1>
                            <p className="max-w-40 truncate text-xs text-gray-700 sm:max-w-none sm:text-sm">
                                <Suspense fallback={null}>
                                    <CurrentDate />
                                </Suspense>
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 sm:gap-6">
                        <Link href="/sign-in" className="whitespace-nowrap text-xs font-medium text-gray-800 transition-colors hover:text-gray-600 sm:text-base">
                            সাইন ইন
                        </Link>

                        <Link href="/sign-up" className="whitespace-nowrap rounded-lg bg-[#05893e] px-3 py-2 text-xs font-medium text-white shadow-sm shadow-green-600 transition-all hover:bg-[#007038] sm:px-6 sm:py-2.5 sm:text-base">
                            সাইন আপ
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-200">
                <nav aria-label="পণ্যের বিভাগ">
                    <Suspense fallback={null}>
                        <NavLink />
                    </Suspense>
                </nav>
            </div>
            <div className="border-b border-gray-200">
                <div>
                    <Suspense fallback={null}>
                        <MarketMarquee />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Header;