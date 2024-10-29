import Banner from "@/components/home/Banner";
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
      </main>
    </>
  );
}
