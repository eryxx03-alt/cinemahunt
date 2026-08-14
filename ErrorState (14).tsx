export default function ErrorState() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6 text-center">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Something went wrong
        </h2>

        <p className="mt-2 text-gray-400">
          We couldn't load the movies. Please try again.
        </p>
      </div>
    </div>
  );
}