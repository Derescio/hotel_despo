'use server'

import { connectDB } from "@/config/db"
import Hotel from "@/models/hotel.models"
import { revalidatePath } from "next/cache";


connectDB();

export const createHotel = async (payload: any) => {
    try {

        const newhotel = new Hotel({
            name: payload.name,
            owner: payload.owner,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            media: payload.media
        });
        // console.log(newhotel)
        const hotel = await newhotel.save();
        revalidatePath('/admin/hotels')
        return {
            success: true,
        }

    } catch (error: any) {
        return {
            success: false,
            error: `Error:  ${error.message}`
        }
    }
}