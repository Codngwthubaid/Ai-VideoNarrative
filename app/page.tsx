import Banner from "@/components/home/Banner";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import { Dot } from "lucide-react";

export default function Home() {
  return (
    <>
      <main>
        <div>
          <Banner />
        </div>
        <div className="flex items-center justify-center">
          <Dot className="text-purple-400" />
          <Dot className="text-purple-400" />
          <Dot className="text-purple-400" />
        </div>
        <div>
          <HowItWorks />
        </div>
        <div className="flex items-center justify-center">
          <Dot className="text-purple-400" />
          <Dot className="text-purple-400" />
          <Dot className="text-purple-400" />
        </div>
        <div>
          <Pricing />
        </div>
        <div className="flex items-center justify-center">
          <Dot className="text-purple-400" />
          <Dot className="text-purple-400" />
          <Dot className="text-purple-400" />
        </div>
      </main>
    </>
  );
}
