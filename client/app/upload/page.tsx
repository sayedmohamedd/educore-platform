"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary/upload";
import { mediaService } from "@/services/media/media.service";

export default function UploadTest() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);
      setProgress(0);

      const result = await uploadToCloudinary({
        file,
        folder: "educore",
        onProgress: setProgress,
      });

      console.log("Cloudinary result:", result);

      // هنا Cloudinary خلص 100%
      // دلوقتي ابعت metadata للـNestJS

      // 2. Create Media in database
      const media = await mediaService.uploadMetadata({
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        filename: file.name,
        size: file.size,
        mimeType: file.type,
      });

      console.log(media, "Media created in database");
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*,video/*" onChange={handleUpload} />

      {uploading && (
        <div>
          <div className="mb-2 flex justify-between">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
