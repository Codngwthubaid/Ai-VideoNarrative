import { ArrowRight } from "lucide-react"
import Link  from "next/link"
export default function UpgradePlan() {
    return (
        <div className="flex justify-center items-center gap-6 flex-col">
             <p className="mt-2 text-gray-600 max-w-2xl text-lg text-center border-2 border-red-200 p-4 rounded-lg border-dashed bg-red-100">You need to upgrade your plan to create the Blog Posts with the power of AI 💻</p>
             <Link className="flex items-center gap-2 font-semibold text-purple-500" href="/#pricing">Go to pricing <ArrowRight className="w-4 h-4"/></Link>
        </div>
    )
}