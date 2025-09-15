import { Button, Link } from '@presentation/components/ui';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>

      <p className="text-lg text-gray-600">Page not found</p>
      <Link href="/" className="mt-4">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
