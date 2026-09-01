export type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  resource_type: "image" | "video" | "raw";
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
};

type UploadOptions = {
  file: File;
  folder?: string;
  onProgress?: (progress: number) => void;
};

export async function uploadToCloudinary({
  file,
  folder = "educore",
  onProgress,
}: UploadOptions): Promise<CloudinaryUploadResult> {
  const signatureResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/media/signature?folder=${encodeURIComponent(folder)}`,
    {
      credentials: "include",
    },
  );

  if (!signatureResponse.ok) {
    const message = await signatureResponse.text();

    throw new Error(message || "Failed to get upload signature");
  }

  const signatureData = await signatureResponse.json();

  const { timestamp, signature, apiKey, cloudName } = signatureData.data;

  const resourceType = file.type.startsWith("video/")
    ? "video"
    : file.type.startsWith("image/")
      ? "image"
      : "raw";

  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("folder", folder);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", uploadUrl);

    xhr.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return;

      const progress = Math.round((event.loaded / event.total) * 100);

      onProgress?.(progress);
    });

    xhr.addEventListener("load", () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`Cloudinary upload failed: ${xhr.status}`));

        return;
      }

      try {
        resolve(JSON.parse(xhr.responseText));
      } catch {
        reject(new Error("Invalid Cloudinary response"));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload"));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Upload cancelled"));
    });

    xhr.send(formData);
  });
}

// export type CloudinaryUploadResult = {
//   public_id: string;
//   secure_url: string;
//   resource_type: string;
//   format: string;
//   bytes: number;
//   width?: number;
//   height?: number;
//   duration?: number;
// };

// type UploadOptions = {
//   file: File;
//   folder?: string;
//   onProgress?: (progress: number) => void;
// };

// export async function uploadToCloudinary({
//   file,
//   folder = "educore",
//   onProgress,
// }: UploadOptions): Promise<CloudinaryUploadResult> {
//   // 1. Get signature from backend
//   const signatureResponse = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/media/signature?folder=${encodeURIComponent(folder)}`,
//     {
//       credentials: "include",
//     },
//   );

//   if (!signatureResponse.ok) {
//     throw new Error("Failed to get upload signature");
//   }

//   const signatureData = await signatureResponse.json();

//   const { timestamp, signature, apiKey, cloudName } = signatureData.data;

//   // 2. Determine Cloudinary resource type
//   const resourceType = file.type.startsWith("video/")
//     ? "video"
//     : file.type.startsWith("image/")
//       ? "image"
//       : "raw";

//   // 3. Prepare form data
//   const formData = new FormData();

//   formData.append("file", file);
//   formData.append("api_key", apiKey);
//   formData.append("timestamp", timestamp.toString());
//   formData.append("signature", signature);
//   formData.append("folder", folder);

//   // 4. Upload directly to Cloudinary
//   const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();

//     xhr.open("POST", uploadUrl);

//     // Upload progress
//     xhr.upload.addEventListener("progress", (event) => {
//       if (!event.lengthComputable) return;

//       const progress = Math.round((event.loaded / event.total) * 100);

//       onProgress?.(progress);
//     });

//     // Success / failure
//     xhr.addEventListener("load", () => {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         try {
//           const result = JSON.parse(xhr.responseText);

//           resolve(result);
//         } catch {
//           reject(new Error("Invalid Cloudinary response"));
//         }

//         return;
//       }

//       reject(new Error(`Cloudinary upload failed: ${xhr.status}`));
//     });

//     xhr.addEventListener("error", () => {
//       reject(new Error("Network error during upload"));
//     });

//     xhr.addEventListener("abort", () => {
//       reject(new Error("Upload cancelled"));
//     });

//     xhr.send(formData);
//   });
// }
