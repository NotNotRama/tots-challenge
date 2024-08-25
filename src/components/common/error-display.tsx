interface ErrorDisplayProps {
  message?: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <h2 className="text-lg font-semibold mb-2">An error occurred</h2>
        <p>{message ?? 'No additional information available.'}</p>{' '}
      </div>
    </div>
  );
}
