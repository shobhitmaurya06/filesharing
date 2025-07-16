import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const publicId = searchParams.get("publicId");
  if (!publicId) {
    return NextResponse.json(
      { error: "publicId is required" },
      { status: 400 }
    );
  }
  try {
    const result = await cloudinary.api.resource(publicId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "File not found or expired" },
      { status: 404 }
    );
  }
}