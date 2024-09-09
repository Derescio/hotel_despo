import React from 'react'
import LinkButton from '@/components/LinkButton'
import PageTitle from '@/components/PageTitle'

const HotelPage = () => {
    return (
        <div className='container mx-auto'>
            <div className="flex justify-between items-center px-2 sm:px-4 ">
                <PageTitle title="Hotels" />
                <LinkButton path="/admin/hotels/add" title="Add Hotel" />
            </div>
        </div>
    )
}

export default HotelPage
