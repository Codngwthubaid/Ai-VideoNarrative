import { ArrowRight, CheckIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

export default function Pricing() {

    const plansMap = [
        {
            id:"free",
            name: "Free",
            description: "Get started now and see how NUNV can elevate your experience!",
            price: "0",
            items: ["5 Blog Posts", "5 Transcriptions"],
            paymentLinks: ""
        },
        {
            id:"basic",
            name: "Basic",
            description: "Effortlessly transform your video content into engaging, SEO-optimized blog posts with our user-friendly platform featuring basic analytics.",
            price: "10",
            items: ["50 Blog Posts", "50 Transcriptions"],
            paymentLinks: ""
        },
        {
            id:"pro",
            name: "Pro",
            description: "Unlock advanced features to transform your video content into optimized blog posts with enhanced SEO tools, in-depth analytics, and priority support.",
            price: "20",
            items: ["Unlimited Blog Posts", "Unlimited Transcriptions"],
            paymentLinks: ""
        }
    ]

    return (
        <section className="relative overflow-hidden" id="pricing">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-12 lg:px-00">
            <div className="flex flex-col justify-center items-center gap-y-10 w-full">
                <div><h2 className="font-bold uppercase text-xl text-purple-600">pricing</h2></div>
                <div><h3 className="mb-24 font-bold text-center">Choose the Perfect Plan for Your Content Creation Needs</h3></div>
            </div>
            </div>
            <div className="relative flex justify-center flex-col items-center lg:flex-row gap-8 lg:items-stretch">
                {plansMap.map(({ name, description, price, items , id}, idx) => 
                <div className="relative w-full max-w-lg" key={idx}>
                    <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 p-8 z-10 rounded-2xl border-gray-500/20 border", id === "pro" && "border-violet-500 gap-5 border-2")}>
                        <div className="flex justify-between items-start gap-4 h-full">
                            <div>
                                <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
                                <p className="text-base-content/80 mt-2">{description}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-5xl tracking-tight font-extrabold">${price}</p>
                            <div className="flex justify-end flex-col mb-[4px]">
                                <p className="text-xs text-base-content/60 uppercase font-semibold">USD</p>
                                <p className="text-xs text-base-content/60">/month</p>
                            </div>
                        </div>
                        <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                            {items.map((items, idx) => (
                                <li className="flex items-center gap-2 " key={idx}>
                                    <CheckIcon size={18}></CheckIcon>
                                    <span>{items}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="space-y-2">
                            <Button variant={"link"} className="border-2 rounded-full flex gap-2 bg-black text-gray-100 hover:no-underline">
                                <Link href="/" className="flex gap-1 items-center">Let's Go
                                    <ArrowRight size={18} />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                )}
            </div>

        </section>
    )
}


