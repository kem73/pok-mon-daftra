import { lazy, Suspense, useState, memo } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { MODE_OPTIONS } from "../utlis/mode-options";

const PaginationView = lazy(() => import("../components/pokemon/PokemonPaginationView"));
const LoadMoreView = lazy(() => import("../components/pokemon/PokemonLoadMoreView"));



const Browser = () => {
  const [mode, setMode] = useState(MODE_OPTIONS.PAGINATION);
  const isPagination = mode === MODE_OPTIONS.PAGINATION;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-1">⚡ Pokédex</h1>
          <p className="text-gray-600">
            Discover and explore Pokémon with your favorite browsing mode
          </p>

          {/* Mode Switch Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            {[
              { id: MODE_OPTIONS.PAGINATION, label: "Page Controls" },
              { id: MODE_OPTIONS.LOAD_MORE, label: "Infinite Scroll" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`px-6 py-3 rounded-lg font-medium shadow-md transition-colors duration-200 ${
                  mode === id
                    ? "bg-yellow-400 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        {/* Content Section */}
        <ErrorBoundary>
          <Suspense fallback={<div className="text-center text-gray-500">Loading Pokémon...</div>}>
            {isPagination ? <PaginationView /> : <LoadMoreView />}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default memo(Browser);
