export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="loader mb-4 h-32 w-32 rounded-full border-8 border-t-8 border-gray-200 ease-linear"></div>
      <p className="text-lg text-gray-600">Loading...</p>
    </div>
  );
}
