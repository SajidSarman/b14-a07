import Banner from "@/components/Banner";
import Cards from "@/components/Cards";
import LoadingSkeleton from "@/components/LoadingSkeleton";
// import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="bg-[#F0F5F0]">
      <Banner></Banner>
      <Suspense fallback={<LoadingSkeleton></LoadingSkeleton>}>
        <Cards></Cards>
      </Suspense>
    </div>
  );
}
