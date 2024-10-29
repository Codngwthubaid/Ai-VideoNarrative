import React from 'react'
import Link from 'next/link'
import { Signature } from 'lucide-react'

const Navlink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
        <Link href={href} className='transition-colors duration-200 text-gray-600 hover:text-purple-500 flex items-center gap-2'>
            {children}
        </Link>
    )
}

export default function Header() {
    return (
        <nav className='container flex justify-between items-center px-8 py-4 mx-auto'>
            <div className='flex lg:flex-1'>
                <Navlink href="/">
                    <span className='flex items-center gap-2 shrink-0'>
                        <Signature className='hover:rotate-12 transform transition duration-200 ease-in-out' />
                    </span>
                    <span className='font-extrabold text-lg'>NU-VideoNarrative</span>
                </Navlink>
            </div>
            <div className='flex lg:justify-center gap-2 lg:gap-12 lg:items-center'>
                <Navlink href="/#pricing">Pricing</Navlink>
                <Navlink href="/#posts">Your Post</Navlink>
            </div>
            <div className='flex lg:flex-1 lg:justify-end gap-2'>
                <div className='flex gap-2 items-center'>
                    <Navlink href='/dashboard'>Upload a Video</Navlink>
                </div>
                <Navlink href='/sign-in'>Sign In</Navlink>
            </div>
        </nav>
    )
}


