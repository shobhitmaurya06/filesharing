import Link from "next/link"
export default function FeaturedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-600 mb-4">FileShare Features</h1>
                <p className="text-lg text-gray-600 text-center mb-12">Instant, secure file sharing without the hassle</p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">Lightning Fast Uploads</h3>
                        </div>
                        <p className="text-gray-600">Upload files in seconds with our Cloudinary-powered infrastructure. Supports JPG, PNG, PDF, MP4, and DOCX formats.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">No Login Required</h3>
                        </div>
                        <p className="text-gray-600">Share files instantly without creating accounts or remembering passwords. Pure, frictionless sharing.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">Auto-Delete Protection</h3>
                        </div>
                        <p className="text-gray-600">Files automatically delete after 3 minutes or immediately after download. Your data never lingers on our servers.</p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">QR Code Sharing</h3>
                        </div>
                        <p className="text-gray-600">Generate QR codes for easy device-to-device transfers. Just scan to download - no typing links required.</p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">One-Click Copy</h3>
                        </div>
                        <p className="text-gray-600">Shareable links copied to your clipboard instantly. Perfect for messaging apps and email.</p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">Secure Transfers</h3>
                        </div>
                        <p className="text-gray-600">End-to-end encrypted transfers with industry-standard security protocols. Your files are safe with us.</p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/">
                    <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl">
                        Start Sharing Now
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}