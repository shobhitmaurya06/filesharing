"use client";
import { useState, useEffect } from "react";
import { FaDownload, FaArrowLeft, FaTrash } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function ReceivePage() {
  const router = useRouter();
  const { publicId } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/get-file?publicId=${publicId}`);
        
        if (!res.ok) {
          throw new Error(await res.text());
        }

        const data = await res.json();
        setFileInfo(data);
      } catch (error) {
        console.error("Error fetching file:", error);
        toast.error("File not found or expired");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (publicId) {
      fetchFile();
    }
  }, [publicId, router]);

  const handleDownload = async () => {
    if (!fileInfo?.secure_url) return;

    try {
      setIsDownloading(true);
      const response = await fetch(fileInfo.secure_url);
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileInfo.original_filename || "downloaded-file";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);

      toast.success("Download started successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed: " + error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReceiveAndDelete = async () => {
    if (!fileInfo?.public_id) return;

    try {
      setIsDeleting(true);
      const res = await fetch('/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId: fileInfo.public_id }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      toast.success("File received and deleted successfully!");
      router.push("/");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete file: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderFilePreview = () => {
    if (!fileInfo) return null;
    const isPDF = fileInfo.format === "pdf" || 
                 fileInfo.secure_url.includes('.pdf') || 
                 fileInfo.resource_type === "raw";

    if (isPDF) {
      return (
        <div className="w-full h-[500px] flex flex-col items-center">
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
            <iframe
              src={`${fileInfo.secure_url}#toolbar=0&navpanes=0`}
              className="w-full h-full border-0"
              title={fileInfo.original_filename}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <Link
              href={fileInfo.secure_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              Open PDF in new tab
            </Link>
            <Link
              href={`https://docs.google.com/viewer?url=${encodeURIComponent(fileInfo.secure_url)}&embedded=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              View with Google Docs
            </Link>
          </div>
        </div>
      );
    }

    switch (fileInfo.resource_type) {
      case "image":
        return (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={fileInfo.secure_url}
              alt={fileInfo.original_filename}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        );
      case "video":
        return (
          <div className="w-full">
            <video
              controls
              className="w-full max-h-[500px]"
              src={fileInfo.secure_url}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
            <div className="text-5xl mb-4">
              {fileInfo.format === "pdf" ? "📄" : "📁"}
            </div>
            <p className="text-lg font-medium">{fileInfo.original_filename}</p>
            <p className="text-sm text-gray-500">
              {(fileInfo.bytes / 1024).toFixed(1)} KB • {fileInfo.format.toUpperCase()}
            </p>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <p>Loading file...</p>
      </div>
    );
  }

  if (!fileInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-red-500 mb-4">File not found</p>
        <Link href="/" className="text-indigo-600 hover:underline">
          Go back to upload
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {fileInfo.original_filename}
        </h1>
        <p className="text-gray-500 mb-6">
          {fileInfo.resource_type?.toUpperCase() || 'FILE'} •{' '}
          {(fileInfo.bytes / 1024).toFixed(1)} KB
        </p>

        <div className="mb-8">
          {renderFilePreview()}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
            >
              <FaDownload />
              {isDownloading ? "Downloading..." : "Download File"}
            </button>

            <Link
              href={fileInfo.secure_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium text-center"
            >
              Open in New Tab
            </Link>
          </div>

          <button
            onClick={handleReceiveAndDelete}
            disabled={isDeleting}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            <FaTrash />
            {isDeleting ? "Deleting..." : "Receive & Delete File"}
          </button>
        </div>
      </div>
    </div>
  );
}