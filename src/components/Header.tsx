
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
            <div className=" border-b border-gray-200">

                <div className='flex justify-between py-2 max-w-7xl px-4 mx-auto'>
                    <div className='flex gap-2'>
                        <Link href="/" className="bg-[#05893e] w-12 h-12 rounded-xl flex items-center justify-center">
                            <div className="text-xl">🛒</div>
                        </Link>
                        <div>
                            <h1 className='font-bold text-xl'>বাজার দর</h1>
                            <p className="text-gray-700">
                                <Suspense fallback={null}>
                                    <CurrentDate />
                                </Suspense>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="text-gray-800 hover:text-gray-600 font-medium text-base transition-colors">
                            সাইন ইন
                        </button>

                        <button className="bg-[#05893e] hover:bg-[#007038] text-white font-medium text-base px-6 py-2.5 rounded-lg shadow-sm shadow-green-600 transition-all">
                            সাইন আপ
                        </button>
                    </div>
                </div>
            </div>

            <div className=" border-b border-gray-200">
                <div>
                    <Suspense fallback={null}>
                        <NavLink />
                    </Suspense>
                </div>
            </div>
            <div className=" border-b border-gray-200">
                <div>
                    <Suspense fallback={null}>
                     <MarketMarquee></MarketMarquee>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Header;