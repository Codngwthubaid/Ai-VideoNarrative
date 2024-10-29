"use client"

import { ArrowRight, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React, { useState, useEffect } from "react"

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function Pricing() {
    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)

    const exchangeRate = 84 // This should be updated regularly in a real application

    const plansMap = [
        {
            id: "free",
            name: "Free",
            description: "Get started now and see how NUNV can elevate your experience!",
            price: "0",
            items: ["5 Blog Posts", "5 Transcriptions"],
        },
        {
            id: "basic",
            name: "Basic",
            description: "Effortlessly transform your video content into engaging, SEO-optimized blog posts with our user-friendly platform featuring basic analytics.",
            price: "10",
            items: ["50 Blog Posts", "50 Transcriptions"],
        },
        {
            id: "pro",
            name: "Pro",
            description: "Unlock advanced features to transform your video content into optimized blog posts with enhanced SEO tools, in-depth analytics, and priority support.",
            price: "20",
            items: ["Unlimited Blog Posts", "Unlimited Transcriptions"],
        }
    ]

    const selectedPlan = plansMap.find(plan => plan.id === selectedPlanId)

    const convertToINR = (usdPrice: string) => {
        return Math.round(parseFloat(usdPrice) * exchangeRate)
    }

    const handleSelectPlan = (planId: string) => {
        setSelectedPlanId(planId)
    }

    const handlePayment = async () => {
        if (!selectedPlan) return

        setIsProcessing(true)
        try {
            const response = await fetch("/api/Order/", { method: "POST" });
            const data = await response.json()

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
                currency: "INR" as string,
                name: "NU-VideoNarrative" as string,
                description: `Payment for ${selectedPlan.name} Plan`,
                order_id: data.orderID,
                amount: convertToINR(selectedPlan.price) * 100, // Razorpay expects amount in paise
                handler: function (response: any) {
                    console.log("Payment Successful", response)
                },
                theme: {
                    color: "#c084fc"
                },
            }

            const newRazorpay = new window.Razorpay(options);
            newRazorpay.open()
        } catch (error) {
            console.error("Payment Failed", error)
        } finally {
            setIsProcessing(false)
        }
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <section className="relative overflow-hidden" id="pricing">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center gap-y-10 w-full">
                    <h2 className="font-bold uppercase text-xl text-purple-600">pricing</h2>
                    <h3 className="mb-24 font-bold text-center text-2xl sm:text-3xl">Choose the Perfect Plan for Your Content Creation Needs</h3>
                </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 pb-12 lg:pb-24 relative flex justify-center flex-col items-center lg:flex-row gap-8 lg:items-stretch">
                {plansMap.map(({ name, description, price, items, id }, idx) => (
                    <div className="relative w-full max-w-sm" key={idx}>
                        <div 
                            className={cn(
                                "relative flex flex-col h-full gap-4 lg:gap-8 p-6 sm:p-8 z-10 rounded-2xl border-gray-500/20 border cursor-pointer transition-all duration-300",
                                id === "pro" && "border-violet-500 border-2",
                                id === selectedPlanId && "bg-purple-100 shadow-lg scale-105"
                            )}
                            onClick={() => handleSelectPlan(id)}
                        >
                            <div className="flex justify-between items-start gap-4 h-full">
                                <div>
                                    <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
                                    <p className="text-base-content/80 mt-2 text-sm">{description}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-end">
                                <p className="text-4xl sm:text-5xl tracking-tight font-extrabold">${price}</p>
                                <div className="flex justify-end flex-col mb-1">
                                    <p className="text-xs text-base-content/60 uppercase font-semibold">USD</p>
                                    <p className="text-xs text-base-content/60">/month</p>
                                </div>
                            </div>
                            <ul className="space-y-2.5 leading-relaxed text-sm flex-1">
                                {items.map((item, idx) => (
                                    <li className="flex items-center gap-2" key={idx}>
                                        <CheckIcon size={18} className="text-green-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="space-y-2">
                                <Button 
                                    className={cn(
                                        "w-full rounded-full flex justify-center items-center gap-2 bg-black text-gray-100 hover:bg-gray-800",
                                        id === selectedPlanId && "bg-purple-600 hover:bg-purple-700"
                                    )}
                                >
                                    {id === selectedPlanId ? "Selected" : "Select Plan"}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8 px-4 sm:px-6 lg:px-8">
                <Button 
                    onClick={handlePayment} 
                    disabled={isProcessing || !selectedPlanId} 
                    className="w-full max-w-md rounded-full flex justify-center items-center gap-2 bg-purple-600 text-white hover:bg-purple-700"
                >
                    {isProcessing ? "Processing..." : (selectedPlanId ? "Proceed to Payment" : "Select a Plan")}
                    <ArrowRight size={18} />
                </Button>
            </div>
        </section>
    )
}