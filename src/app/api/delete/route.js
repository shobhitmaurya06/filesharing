import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dfrazzg8x",
  api_key: "843854963489147",
  api_secret: "nu_XBjWyv8ghKxDcAOeFu-HPCZ8",
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { public_id } = body;

    if (!public_id) {
      return new Response(JSON.stringify({ error: 'Missing public_id in request body.' }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Try all valid resource types
    const resourceTypes = ["image", "video", "raw"];
    for (const type of resourceTypes) {
      try {
        const result = await cloudinary.uploader.destroy(public_id, {
          resource_type: type,
        });

        if (result.result === "ok" || result.result === "not_found") {
          return new Response(JSON.stringify({
            message: `✅ File deleted successfully as ${type}.`,
            result
          }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    // If none worked
    return new Response(JSON.stringify({
      message: "Could not determine file type for deletion.",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error(" Cloudinary deletion error:", error);
    return new Response(JSON.stringify({
      error: "Failed to delete file.",
      details: error.message || error,
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
