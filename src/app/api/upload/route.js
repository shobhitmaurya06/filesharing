import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dfrazzg8x",
  api_key: "843854963489147",
  api_secret: "nu_XBjWyv8ghKxDcAOeFu-HPCZ8",
});

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper to parse form using formidable
const parseForm = async (req) => {
  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    filename: (_, ext, part) => `${Date.now()}-${part.originalFilename}`,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

// API handler
export async function POST(req) {
  try {
    // Convert the request to a compatible format for formidable
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const tempFilePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
    fs.writeFileSync(tempFilePath, buffer);

    const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
      folder: "uploads",
      resource_type: "raw",
      use_filename: true,
      unique_filename: false,
      public_id: `uploads/${file.name}`, // maintains full original name
    });

    // Clean up local file after upload
    fs.unlinkSync(tempFilePath);

    // Schedule auto-delete in 3 minutes
    setTimeout(async () => {
      try {
        await cloudinary.uploader.destroy(uploadResult.public_id, {
          resource_type: "raw",
        });
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
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
  }
}
