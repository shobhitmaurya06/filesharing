import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Handle POST requests
export async function POST(request) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: "publicId is required" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result !== "ok") {
      return NextResponse.json(
        { error: "Failed to delete file" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete file" },
      { status: 500 }
    );
  }
}