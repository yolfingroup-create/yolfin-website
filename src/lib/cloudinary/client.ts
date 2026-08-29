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
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "placeholder-cloud-name";
  const transformations: string[] = [];

  if (options?.crop) transformations.push(`c_${options.crop}`);
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  transformations.push(`q_${options?.quality || "auto"}`);
  transformations.push(`f_${options?.format || "auto"}`);

  const transformString = transformations.length > 0 ? `${transformations.join(",")}/` : "";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${publicId}`;
}
