
import { Suspense } from "react";

import CurrentDate from "./CurrentDate";
import NavLink from "./NavLink";
import Link from "next/link";
import MarketMarquee from "./Marquee";
import UserInfo from "./UserInfo";

const Header = () => {

    // const date = new Date().toLocaleDateString("bn-BD", {
    //     dateStyle: "full"
    // })

    return (
        <div>
            <div className="border-b border-gray-200">

                <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-2 sm:px-6">
                    <Link href="/" >
                        <div className="flex min-w-0 items-center gap-2">

                            {/* <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#05893e] sm:h-12 sm:w-12"> */}

                            <div className="text-xl flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#05893e] sm:h-12 sm:w-12">🛒</div>
                            {/* </div> */}
                            <div className="min-w-0">
                                <h1 className="text-lg font-bold sm:text-xl">বাজার দর</h1>
                                <p className="max-w-40 truncate text-xs text-gray-700 sm:max-w-none sm:text-sm">
                                    <Suspense fallback={null}>
                                        <CurrentDate />
                                    </Suspense>
                                </p>
                            </div>
                        </div>
                    </Link>

                    <UserInfo></UserInfo>
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