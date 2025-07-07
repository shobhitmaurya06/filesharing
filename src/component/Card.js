"use client";
import { useState, useEffect, useRef } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import QRCode from "qrcode";
import Link from "next/link";
import toast from "react-hot-toast";
export default function Card() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [cloudUrl, setCloudUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [receive, setReceive] = useState("Receive");

  const hasDeletedRef = useRef(false);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setCloudUrl("");
    setQrCode("");
    setPublicId("");
    setTimeLeft(null);
    hasDeletedRef.current = false;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setCloudUrl(data.secure_url);
      setPublicId(data.public_id);
      const qr = await QRCode.toDataURL(data.secure_url);
      setQrCode(qr);
      setTimeLeft(180); // 3 minutes
      toast.success("File uploaded successfully ✅");
    } catch (err) {
      toast.error("❌ Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFileFromCloudinary = async () => {
    if (!publicId || hasDeletedRef.current) return;

    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!res.ok) throw new Error("Delete failed");

      toast("⚠️ File deleted.");
      hasDeletedRef.current = true;

      setFile(null);
      setFileName("");
      setCloudUrl("");
      setQrCode("");
      setPublicId("");
      setTimeLeft(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Auto-delete timer
  useEffect(() => {
    if (!publicId || timeLeft === null || hasDeletedRef.current) return;

    if (timeLeft <= 0) {
      deleteFileFromCloudinary();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, publicId]);

  const handleReceive = async () => {
    if (!publicId) return;

    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!res.ok) throw new Error("Receive failed");

      toast.success("File marked as received ✅");
      setReceive("Received");

      // Reset state without reload
      setFile(null);
      setFileName("");
      setCloudUrl("");
      setQrCode("");
      setPublicId("");
      setTimeLeft(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Delete file if tab closes
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (publicId && !hasDeletedRef.current) {
        const blob = new Blob([JSON.stringify({ public_id: publicId })], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/delete", blob);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [publicId]);

  return (
    <div className="flex flex-col gap-6 border border-gray-200 p-6 sm:p-10 w-[95%] sm:w-[90%] max-w-xl rounded-3xl shadow-xl bg-white items-center mx-auto mt-12">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Secure File Upload
      </h1>
      <p className="text-base text-gray-600 text-center">
        Supports: <span className="font-medium">JPG, PNG, PDF, MP4, DOCX</span>
      </p>

      <label
        htmlFor="fileUpload"
        className="flex flex-col items-center gap-2 p-4 bg-gray-100 hover:bg-gray-200 rounded-xl border border-dashed border-gray-400 cursor-pointer transition-all"
      >
        <img
          src="/upload.png"
          className="w-16 h-16 hover:scale-105 transition-transform"
          alt="Upload Icon"
        />
        <span className="text-sm text-gray-600 font-medium">
          Click to select a file
        </span>
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={(e) => {
            const selectedFile = e.target?.files?.[0];
            if (selectedFile) {
              setFile(selectedFile);
              setFileName(selectedFile.name);
              setQrCode("");
              setCloudUrl("");
              setPublicId("");
              setTimeLeft(null);
              hasDeletedRef.current = false;
            }
          }}
        />
      </label>

      {fileName && (
        <p className="text-sm text-gray-700">
          📄 <strong>Selected File:</strong> {fileName}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`flex items-center gap-2 text-lg px-8 py-2 rounded-2xl font-semibold transition-colors duration-200 ${
          file && !isUploading
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <IoIosCloudUpload size={24} />
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {qrCode && (
        <div className="mt-6 text-center w-full">
          <p className="text-sm text-gray-500 mb-3">
            Scan QR or click below —{" "}
            <span className="text-red-500">auto-deletes in 3 minutes</span>
          </p>
          <img
            src={qrCode}
            alt="QR Code"
            className="w-44 h-44 mx-auto border rounded-lg"
          />

          <Link
            href={cloudUrl}
            target="_blank"
            download
            className="mt-4 flex justify-center items-center gap-2 text-blue-600 hover:underline text-sm"
          >
            <FaDownload />
            Download File
          </Link>

          <button
            onClick={handleReceive}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-5 py-1.5 rounded-full text-sm font-medium"
          >
            {receive}
          </button>

          {timeLeft !== null && (
            <p className="text-xs text-orange-600 mt-3 font-mono">
              Auto-delete in: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </p>
          )}

          {publicId && (
            <p className="text-green-600 mt-2 text-xs break-words">
              ✅ Uploaded ID: <code className="font-mono">{publicId}</code>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
