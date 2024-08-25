import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function LoadingDisplay() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner className="w-12 h-12" />
      <p className="ml-4 text-lg text-gray-600">Loading countries...</p>
    </div>
  );
}
