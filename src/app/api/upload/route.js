// app/api/upload/route.js
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dfrazzg8x",
  api_key:"843854963489147",
  api_secret: "nu_XBjWyv8ghKxDcAOeFu-HPCZ8",
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload directly to Cloudinary without saving locally
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          resource_type: "auto", // Let Cloudinary detect file type
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // Schedule auto-delete in 3 minutes
    setTimeout(async () => {
      try {
        await cloudinary.uploader.destroy(uploadResult.public_id);
        console.log(`Auto-deleted: ${uploadResult.public_id}`);
      } catch (error) {
        console.error("Auto-delete failed:", error.message);
      }
    }, 3 * 60 * 1000);

    return NextResponse.json({
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      expiresAt: Date.now() + 3 * 60 * 1000,
    });
  } catch (err) {
    console.error("Upload error:", err.message);
    return NextResponse.json(
      { error: "Failed to upload file: " + err.message },
      { status: 500 }
    );
  }
}