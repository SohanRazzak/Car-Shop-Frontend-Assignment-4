import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase.config";

type UploadFileProps = {
    onUploadComplete: (url: string) => void;
};

const UploadFile = ({ onUploadComplete }: UploadFileProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        onUploadComplete(downloadURL);
        setUploading(false);
    };

    return (
        <div className="flex flex-row gap-2 items-center">
            <input type="file" className="file-input" onChange={handleSelectFile} />
            <button
                className="btn btn-info uppercase text-white"
                onClick={handleUpload}
                disabled={!file || uploading}
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
};

export default UploadFile;
