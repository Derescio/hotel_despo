'use client'
import React from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

const LinkButton = ({ title, path }: { title: string, path: string }) => {
    const router = useRouter()
    return (
        <Button type="default" onClick={() => router.push(path)}>{title}</Button>
    )
}

export default LinkButton
