'use server'
import { getCurrentUserFromDB } from '@/server-actions/users'

export async function getUserProfile() {
    const { success, data: user } = await getCurrentUserFromDB()

    if (success && user) {
        return user
    }

    return null
}
