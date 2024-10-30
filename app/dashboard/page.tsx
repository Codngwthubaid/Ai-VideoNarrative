"use client"
import { Badge } from "@/components/ui/badge"
import UpgradePlan from "@/components/Upload/UpgradePlan"
import UploadFunc from "@/components/Upload/UploadFunc"
import { useState } from "react"

export default function page() {

const [isFree, setIsFree] = useState(false)
const [isPlanTypeName, setIsPlanTypeName] = useState(false)
const [hasUserCancelled, setHasUserCancelled] = useState(true)

    return (
        <section>
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="flex flex-col justify-center items-center text-center gap-6">
                    <Badge className="bg-gradient-to-r from-purple-700 to-pink-800 text-white px-4 py-1 text-lg font-semibold capitalize" variant="outline">Basic</Badge>
                    <h2 className="capitalize text-3xl font-bold sm:text-4xl text-gray-900">Start creating amazing content</h2>
                    <p className="mt-2 text-gray-600 max-w-2xl text-lg text-center">Upload your audio or video file and let our AI do magic</p>

                    <p className="">You get <span className="font-bold text-amber-500 bg-amber-100 rounded-lg p-1">{isFree ? "50" : "5"} blog posts</span> as part of the <span className="font-bold">{isPlanTypeName ? "Basic" : "Free"}</span> plan</p>

                    {hasUserCancelled ? <UploadFunc/> : <UpgradePlan/>}
                </div>
            </div>
        </section>
    )
}


