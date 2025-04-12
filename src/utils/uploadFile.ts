// utils/uploadImage.ts
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const uploadFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            snapshot => {
                // Optional: You can show upload progress here
                console.log(snapshot);
            },
            error => {
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
            }
        );
    });
};
