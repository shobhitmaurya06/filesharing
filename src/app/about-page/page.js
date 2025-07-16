import Link from "next/link"

export default function AboutPage(){
    return (
       <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
  <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
    <h1 className="text-4xl font-bold text-center text-indigo-600">About FileShare</h1>
    
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h2>
        <p className="text-gray-600 leading-relaxed">
          FileShare was born from the need to share documents filely and securely without the hassle of 
          permanent cloud storage. Our vision is to create frictionless, ephemeral file sharing that respects 
          your privacy while providing instant access to your recipients.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-medium text-indigo-700 mb-2">1. Upload</h3>
            <p className="text-gray-600 text-sm">
              Simply drag & drop your JPG, PNG, PDF, MP4, or DOCX file. Our Cloudinary integration ensures fast uploads.
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-medium text-indigo-700 mb-2">2. Share</h3>
            <p className="text-gray-600 text-sm">
              Get a QR code to scan or copy the link instantly. No accounts needed - just pure sharing.
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-medium text-indigo-700 mb-2">3. Auto-Clean</h3>
            <p className="text-gray-600 text-sm">
              Files self-destruct after 3 minutes or immediately when opened by the recipient.
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Key Features</h2>
        <ul className="space-y-3 text-gray-600 list-disc pl-5">
          <li><span className="font-medium">Multi-format support</span>: Works with images, documents, videos and more</li>
          <li><span className="font-medium">Instant QR sharing</span>: Perfect for device-to-device transfers</li>
          <li><span className="font-medium">One-click copy</span>: Share links with a single button press</li>
          <li><span className="font-medium">Zero storage</span>: Files are permanently deleted after sharing</li>
          <li><span className="font-medium">No registration</span>: Completely anonymous file transfers</li>
        </ul>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Privacy First</h2>
        <p className="text-gray-600 leading-relaxed">
          Unlike traditional cloud services, fileShare never stores your files permanently. Our automatic 
          deletion system ensures your documents disappear from our servers the moment they are delivered 
          or when the timer expires - whichever comes first. We dont track downloads or maintain logs of 
          your transfers.
        </p>
      </section>
      
      <div className="pt-4 text-center">
        <Link href="/">
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
          Try fileShare Now
        </button>
        </Link>
      </div>
    </div>
  </div>
</div>
    )
}