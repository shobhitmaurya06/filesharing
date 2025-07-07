import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

// Disable built-in body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dfrazzg8x",
  api_key: "843854963489147",
  api_secret: "nu_XBjWyv8ghKxDcAOeFu-HPCZ8",
});

// Uploads directory
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Convert Web API Request to Node stream
async function toNodeStream(req) {
  const buffer = await req.arrayBuffer();
  const stream = new Readable();
  stream.push(Buffer.from(buffer));
  stream.push(null);
  stream.headers = {
    "content-type": req.headers.get("content-type"),
    "content-length": req.headers.get("content-length") || "0",
  };
  return stream;
}

// Parse form with formidable
async function parseForm(req) {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    uploadDir,
    filename: (_, ext, part) => {
      return `${Date.now()}-${part.originalFilename}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

// POST Handler
export async function POST(req) {
  try {
    const nodeReq = await toNodeStream(req);
    const { files } = await parseForm(nodeReq);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file || !file.filepath) {
      throw new Error("No file uploaded");
    }

  const originalFullName = path.basename(file.originalFilename); // "myDoc.pdf"
const result = await cloudinary.uploader.upload(file.filepath, {
  folder: "uploads",
  resource_type: "raw",
  public_id: `uploads/${originalFullName}`, // 👈 full name including extension
  use_filename: true,
  unique_filename: false, // ensures it uses this name exactly
});

    fs.unlinkSync(file.filepath); // delete temp file

    // Schedule auto-deletion in 3 minutes
    setTimeout(async () => {
      if(result?.public_id){
      try {
        if(result?.public_id)
        await cloudinary.uploader.destroy(result.public_id, {
          resource_type: result.resource_type,
        });
      } catch (e) {
        console.error("Failed to auto-delete Cloudinary file:", e.message);
      }
    }
    }, 3 * 60 * 1000);

    return NextResponse.json({
      secure_url: result.secure_url,
      public_id: result.public_id,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
