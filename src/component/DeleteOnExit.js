"use client";
import { useEffect } from "react";
export default function DeleteOnExit({ publicId }) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (publicId) {
        const blob = new Blob([JSON.stringify({ public_id: publicId })], {
          type: "application/json",
        });
        navigator.sendBeacon("app/api/delete", blob);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [publicId]);

  return null;
}
