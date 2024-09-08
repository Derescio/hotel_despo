import React from 'react'
import PageTitle from '@/components/PageTitle'
import HotelForm from '@/app/admin/hotels/_shared/hotel.form'

const page = () => {
    return (
        <div className='container mx-auto'>
            <div className='mt-12'>
                <PageTitle title="Add Hotel" />
                <HotelForm />
            </div>

        </div>
    )
}

export default page
