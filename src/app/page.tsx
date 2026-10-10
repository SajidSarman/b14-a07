import Banner from "@/components/Banner";
import Cards from "@/components/Cards";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#F0F5F0]">
      <Banner></Banner>
      <Cards></Cards>
    </div>
  );
}
