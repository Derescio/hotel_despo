import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    media: {
        type: Array,
        required: true
    }

},
    { timestamps: true });

if (mongoose.models && mongoose.models['hotel']) {
    delete mongoose.models['hotel'];
}

export default mongoose.models.Hotel || mongoose.model('hotel', hotelSchema);