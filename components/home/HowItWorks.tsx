import { Brain, MoveRight } from "lucide-react";

export default function HowItWorks() {
    return (
        <div className="py-24 relative overflow-hidden">
            <div className="flex flex-col justify-center items-center gap-y-10 w-full">
                <div><h2 className="font-bold uppercase text-xl text-purple-600">How it's works</h2></div>
                <div><h3 className="mb-24 font-bold text-center">Easily repurpose your content into SEO focused blog posts</h3></div>
            </div>
            <div className="flex justify-center items-center gap-4 lg:gap-24">
                <div className="flex flex-col gap-4">
                    <p className="text-7xl text-center">📽</p>
                    <p className="text-center font-medium">Upload a Video</p>
                </div>
                <MoveRight size={64} strokeWidth={0.5} className="text-purple-500" />
                <div className="flex flex-col gap-4">
                    <Brain size={64} strokeWidth={0.5} />
                    <p className="text-center font-medium">AI Magic</p>
                </div>
                <MoveRight size={64} strokeWidth={0.5} className="text-purple-500" />
                <div className="flex flex-col gap-4">
                    <p className="text-7xl text-center">📝</p>
                    <p className="text-center font-medium">Blog</p>
                </div>
            </div>
        </div>
    )
}


