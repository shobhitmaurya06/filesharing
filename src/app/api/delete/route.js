import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dfrazzg8x",
  api_key: "843854963489147",
  api_secret: "nu_XBjWyv8ghKxDcAOeFu-HPCZ8",
});

// Handle POST requests
export async function POST(req) {
  try {
    const body = await req.json();
    const { public_id } = body;

    if (!public_id || typeof public_id !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid public_id." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resourceTypes = ["image", "video", "raw"];

    for (const type of resourceTypes) {
      try {
        const result = await cloudinary.uploader.destroy(public_id, {
          resource_type: type,
        });

        if (result.result === "ok" || result.result === "not_found") {
          return new Response(
            JSON.stringify({
              message: `✅ File deleted as '${type}'.`,
              result,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      } catch (cloudErr) {
        console.warn(`Attempt to delete as ${type} failed: ${cloudErr.message}`);
        continue; // Try next resource type
      }
    }

    return new Response(
      JSON.stringify({
        error: "❌ File deletion failed — unknown type or not found.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Cloudinary Deletion Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error during file deletion.",
        details: error.message || error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
