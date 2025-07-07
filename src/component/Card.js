"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import QRCode from "qrcode";
import Link from "next/link";
import Image from "next/image";
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
  const [uploadProgress, setUploadProgress] = useState(0);

  const hasDeletedRef = useRef(false);

  const resetAll = useCallback(() => {
    setFile(null);
    setFileName("");
    setCloudUrl("");
    setQrCode("");
    setPublicId("");
    setTimeLeft(null);
    setUploadProgress(0);
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    // File validation
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'video/mp4',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error("Unsupported file type. Please upload JPG, PNG, PDF, MP4, or DOCX");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    setCloudUrl("");
    setQrCode("");
    setPublicId("");
    setTimeLeft(null);
    hasDeletedRef.current = false;
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "api/upload", true);
      // Progress tracking
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };

      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(xhr.statusText));
          }
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(formData);
      });

      const data = await uploadPromise;
      
      setCloudUrl(data.secure_url);
      setPublicId(data.public_id);
      
      // Generate QR code
      const qr = await QRCode.toDataURL(data.secure_url);
      setQrCode(qr);
      
      setTimeLeft(180); // 3 minutes
      toast.success("File uploaded successfully ✅");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteFileFromCloudinary = useCallback(async () => {
    if (!publicId || hasDeletedRef.current) return;

    try {
      const res = await fetch("api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Delete failed");
      }

      toast("⚠️ File deleted from cloud storage.");
      hasDeletedRef.current = true;
      resetAll();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.message);
    }
  }, [publicId, resetAll]);

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
  }, [timeLeft, publicId, deleteFileFromCloudinary]);

  const handleReceive = async () => {
    if (!publicId) return;
    try {
      const res = await fetch("api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Receive failed");
      }

      toast.success("File marked as received ✅");
      setReceive("Received");
      resetAll();
    } catch (err) {
      console.error("Receive error:", err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (publicId && !hasDeletedRef.current) {
        e.preventDefault();
        e.returnValue = "You have unsaved uploads. Are you sure you want to leave?";
        
        // Attempt to delete file before leaving
        navigator.sendBeacon(
          "/api/delete", 
          JSON.stringify({ public_id: publicId })
        );
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
        Supports: <span className="font-medium">JPG, PNG, PDF, MP4, DOCX</span> (Max 10MB)
      </p>

      <label
        htmlFor="fileUpload"
        className="flex flex-col items-center gap-2 p-4 bg-gray-100 hover:bg-gray-200 rounded-xl border border-dashed border-gray-400 cursor-pointer transition-all w-full"
      >
        <Image
          src="/upload.png"
          alt="Upload Icon"
          width={64}
          height={64}
          className="hover:scale-105 transition-transform"
          priority
        />
        <span className="text-sm text-gray-600 font-medium">
          {file ? "Change file" : "Click to select a file"}
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
          accept=".jpg,.jpeg,.png,.pdf,.mp4,.docx"
        />
      </label>

      {fileName && (
        <div className="w-full text-center">
          <p className="text-sm text-gray-700">
            📄 <strong>Selected File:</strong> {fileName}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
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

      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {qrCode && (
        <div className="mt-6 text-center w-full">
          <p className="text-sm text-gray-500 mb-3">
            Scan QR or click below —{" "}
            <span className="text-red-500">auto-deletes in 3 minutes</span>
          </p>
          <Image
            src={qrCode}
            alt="QR Code"
            width={176}
            height={176}
            className="mx-auto border rounded-lg"
          />

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href={cloudUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-2 text-blue-600 hover:underline text-sm"
            >
              <FaDownload />
              Download File
            </Link>

            <button
              onClick={handleReceive}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-1.5 rounded-full text-sm font-medium"
            >
              {receive}
            </button>
          </div>

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