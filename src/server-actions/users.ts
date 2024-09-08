'use server'
import { currentUser } from "@clerk/nextjs/server"
import UserModel from "@/models/user.model";
import { connectDB } from "@/config/db";

connectDB();


export const getCurrentUserFromDB = async () => {
    try {
        const currentClerkUser = await currentUser();
        const user = await UserModel.findOne({ clerkUserId: currentClerkUser?.id });
        if (user) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(user))
            }
        }

        const newUser = new UserModel({
            name: currentClerkUser?.firstName + " " + currentClerkUser?.lastName,
            email: currentClerkUser?.emailAddresses[0].emailAddress,
            clerkUserId: currentClerkUser?.id,
            profilePicture: currentClerkUser?.imageUrl,
            isAdmin: false,
            isActive: true
        })

        await newUser.save();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(newUser))
        }

    } catch (error) {
        return {
            success: false,
            error: error,
            message: "Something went wrong while connecting to DB"
        }
    }
}