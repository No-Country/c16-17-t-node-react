import { config } from '../config';

const { apiCloudinary } = config;

export const saveOnCloundinary = async (blob) => {
  const response = await fetch(`${apiCloudinary}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file: blob,
      upload_preset: "ml_default",
      folder: "petpal",
      tags: ["petpal"]
    }),
  });
  const data = await response.json();
  return data;
};
