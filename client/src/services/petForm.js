export const getPetUrl = petBlob => {
    const cloudUrl = import.meta.env.VITE_APP_CLOUDINARY_API
    return (fetch(cloudUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        file: petBlob,
        upload_preset: "ml_default",
        folder: "petpal",
        tags: ["petpal"]
        }),
    }).then(res => res.json()))
};