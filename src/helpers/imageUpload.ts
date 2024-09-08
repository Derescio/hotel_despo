import { app } from "../config/firebase";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



export const uploadImage = async (files: File[]) => {
    const storage = getStorage(app); {
        try {
            //Upload Images to Firebase
            const uploadedImage = await Promise.all(
                files.map(async (file) => {
                    console.log('Uploading:', file.name);
                    const storageRef = ref(storage, `images/${file.name}`);
                    await uploadBytes(storageRef, file);
                    return storageRef;
                })
            );

            //Get Url of Image
            const imageUrls = await Promise.all(
                uploadedImage.map(async (ref) => {
                    const url = await getDownloadURL(ref);
                    console.log('Image URL:', url); // Log the image URLs
                    return url;
                })
            );
            return imageUrls;

        } catch (error) {
            console.error("Error during upload:", error)
            throw new Error("Error uploading image");
        }


    }
}

