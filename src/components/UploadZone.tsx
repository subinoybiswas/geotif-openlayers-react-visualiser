import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadDropzone = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file && file.type === 'image/tiff') {
            setLoading(true);

            try {
                // Step 1: Get the secure URL from the server
                const response = await fetch("http://localhost:5000/api/upload");

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Server error response:", errorText);
                    throw new Error("Failed to fetch signed URL");
                }

                const { url } = await response.json();
                console.log("Signed URL:", url);

                // Step 2: Upload the TIFF file to the signed URL
                await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": file.type,
                    },
                    body: file,
                });

                // Extract the base URL from the signed URL
                const imageUrl = url.split('?')[0];
                console.log("Image uploaded:", imageUrl);

                setUploadedImage(imageUrl);
                setLoading(false);
            } catch (error) {
                console.error("Error uploading file:", error);
                setLoading(false);
            }
        } else {
            alert("Please upload a TIFF file.");
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/tiff',
        maxFiles: 1,
    });

    return (
        <div className="upload-container border-2 min-h-[200px] m-2 rounded-lg flex items-center px-5 text-wrap text-center">
            {!loading && !uploadedImage && (
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop a TIFF file here, or click to select one</p>
                </div>
            )}

            {loading && <p>Uploading...</p>}

            {uploadedImage && (
                <div>
                    <h3>Image Uploaded Successfully</h3>
                    <a href={uploadedImage} target="_blank" rel="noopener noreferrer">
                        View Uploaded Image
                    </a>
                    <br />
                </div>
            )}
        </div>
    );
};

export default UploadDropzone;
