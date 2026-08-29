import { createHash } from "crypto";

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
}

export function buildCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "limit" | "thumb";
    quality?: "auto" | number;
    format?: "auto" | "webp" | "avif" | "jpg" | "png";
  }
): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "yolfin";

  if (publicId.startsWith("http://") || publicId.startsWith("https://") || publicId.startsWith("data:")) {
    return publicId;
  }

  const transformations: string[] = [];

  if (options?.crop) transformations.push(`c_${options.crop}`);
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  transformations.push(`q_${options?.quality || "auto"}`);
  transformations.push(`f_${options?.format || "auto"}`);

  const transformString = transformations.length > 0 ? `${transformations.join(",")}/` : "";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${publicId}`;
}

/**
 * Server-side helper to upload image buffer / data to Cloudinary.
 * Falls back safely to data-URL storage if Cloudinary credentials are not configured.
 */
export async function uploadToCloudinaryServer(
  fileBuffer: Buffer,
  mimeType: string,
  folder = "yolfin"
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const isConfigured =
    cloudName &&
    apiKey &&
    apiSecret &&
    !cloudName.includes("your-cloudinary") &&
    !apiKey.includes("your-cloudinary");

  if (isConfigured) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = createHash("sha1").update(signatureStr).digest("hex");

    const formData = new FormData();
    const blob = new Blob([new Uint8Array(fileBuffer)], { type: mimeType });
    formData.append("file", blob, "upload.jpg");
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return {
        public_id: data.public_id,
        secure_url: data.secure_url,
        url: data.url,
        width: data.width || 800,
        height: data.height || 600,
        format: data.format || "jpg",
        resource_type: data.resource_type || "image",
        bytes: data.bytes || fileBuffer.length,
      };
    }
  }

  // Fallback for development without live Cloudinary credentials
  const base64 = fileBuffer.toString("base64");
  const dataUrl = `data:${mimeType};base64,${base64}`;
  const mockPublicId = `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    public_id: mockPublicId,
    secure_url: dataUrl,
    url: dataUrl,
    width: 800,
    height: 600,
    format: mimeType.split("/")[1] || "jpg",
    resource_type: "image",
    bytes: fileBuffer.length,
  };
}
