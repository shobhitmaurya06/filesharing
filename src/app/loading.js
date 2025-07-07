export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-blue-500 animate-spin"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <span className="text-blue-600 font-semibold text-lg">Loading</span>
        </div>
      </div>
    </div>
  );
}
