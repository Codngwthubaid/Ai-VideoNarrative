import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Banner = () => {
    return (
        <section className='lg:max-w-6xl mx-auto flex flex-col z-0 items-center justify-center py-28 sm:pt-32 transition-all animate-in'>
            <h1 className='py-6 text-center'>Turn your words into {" "}
                <span className='underline underline-offset-8 decoration-dashed decoration-purple-400'>Captivating</span> {" "} blog posts
            </h1>
            <h2 className='text-center px-4 lg:px-0 lg:max-w-4xl'>Convert your videos and voice into Blog Post in seconds with the power of AI
            </h2>

            <Button variant={"link"} className=''>
                <Link href="/#pricing">Get's NUVN with the power of AI</Link>
            </Button>

        </section>
    )
}

export default Banner
