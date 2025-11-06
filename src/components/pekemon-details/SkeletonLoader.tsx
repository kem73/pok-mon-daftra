const SkeletonLoader = () => (
  <div className="min-h-screen flex justify-center items-center p-6">
    <div className="w-full max-w-3xl animate-pulse space-y-4">
      <div className="bg-gradient-to-r from-pink-300 to-purple-300 h-24 rounded-lg" />
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="h-40 w-40 bg-gray-200 mx-auto rounded-full" />
        <div className="flex justify-center gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-6 w-20 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-4 w-1/2 bg-gray-200 mx-auto rounded" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-3 bg-gray-200 rounded w-full" />
        ))}
      </div>
    </div>
  </div>
);

export default SkeletonLoader