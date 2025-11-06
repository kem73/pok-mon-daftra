import { useEffect, useState, useCallback } from "react";
import { usePokemonPage } from "../../services/api/pokemon";
import PokemonCard from "./PokemonCard";




export default function LoadMoreView() {
  const ITEMS_PER_PAGE = 20;
  const [page, setPage] = useState(1);
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isFetching, error, refetch } = usePokemonPage(page, ITEMS_PER_PAGE);

  const extractIdFromUrl = useCallback((url: string): number => {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? Number(match[1]) : 0;
  }, []);

  // merge pages 
  useEffect(() => {
    if (data?.results?.length) {
      setPokemonList((prev) => {
        const existingNames = new Set(prev.map((p) => p.name));
        const newResults = data.results.filter((p) => !existingNames.has(p.name));
        return [...prev, ...newResults];
      });
      setHasMore(Boolean(data.next));
    }
  }, [data]);

  const handleLoadMore = () => {
    if (!isFetching && hasMore) setPage((prev) => prev + 1);
  };

  return (
    <section className="pb-12">
      {/* Error Message */}
      {error && (
        <div className="text-center text-red-600 mb-4">
          <p className="mb-2">{error.message || "Failed to load Pokémon."}</p>
          <button
            onClick={() => refetch()}
            className="underline text-blue-600 hover:text-blue-700 font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        {pokemonList.map((pokemon) => {
          const id = extractIdFromUrl(pokemon.url);
          return (
            <PokemonCard
              key={pokemon.name}
              id={id}
              name={pokemon.name}
              imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            />
          );
        })}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <p className="text-center text-gray-500">Loading Pokémon...</p>
      )}

      {/* Load More Button */}
      {!isLoading && hasMore && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isFetching}
            className="px-8 py-3 rounded-lg font-medium bg-yellow-400 text-white shadow-md hover:bg-yellow-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* End Message */}
      {!hasMore && !isFetching && (
        <p className="text-center text-sm text-gray-400 mt-6">
          🎉 You’ve reached the end of the Pokédex!
        </p>
      )}
    </section>
  );
}
