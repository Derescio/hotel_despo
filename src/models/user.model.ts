import { profile } from "console";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    clerkUserId: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true
    },

},
    { timestamps: true });

if (mongoose.models['User']) {
    delete mongoose.models['User'];
}

export default mongoose.models.User || mongoose.model('User', userSchema);