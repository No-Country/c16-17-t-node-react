import { config } from '../config';

const { apiCloudinary } = config;

export const getPetUrl = petBlob => {
    return (fetch(apiCloudinary, {
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
