import React, { Suspense } from 'react'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import { getCurrentUserFromDB } from '@/server-actions/users'
import MenuToggle from './MenuToggle'
import Link from 'next/link'
import { Button } from 'antd'
import Spinner from './Spinner'


const UserInfo = async () => {
    const { success, data: user } = await getCurrentUserFromDB()
    return <span className='hidden sm:block'>{success && user ? `${user.name}` : ''}</span>
}

const Navbar = async () => {

    return (
        <div className='container mx-auto'>
            <div className='flex justify-between p-4 items-center'>
                <MenuToggle />

                <Link href='/' className='text-3xl no-underline'>Hotel Despo</Link>

                <div className='flex gap-4 items-center '>
                    <Suspense fallback={<Spinner />}>
                        <UserInfo />
                    </Suspense>



                    <SignedOut>

                        <div>
                            <SignInButton>
                                <Button type='primary'>Login</Button>
                            </SignInButton>
                        </div>

                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </div>
    )
}

export default Navbar
