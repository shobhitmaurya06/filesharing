// app/api/upload/route.js
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Set expiration time to 3 minutes (180 seconds)
    const expirationTime = Math.floor(Date.now() / 1000) + 180;

    // Upload to Cloudinary with expiration
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "temp_uploads",
            expires_at: expirationTime,

          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });
    setTimeout(async () => {
      try {
        await cloudinary.uploader.destroy(result.public_id);
        console.log(`Deleted file: ${result.public_id}`);
      } catch (error) {
        console.error(`Error deleting file ${result.public_id}:`, error);
      }
    }, 180000);

    return NextResponse.json({
      public_id: result.public_id,
      secure_url: result.secure_url,
      expires_at: expirationTime,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}