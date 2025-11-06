import { Link, useParams } from "react-router-dom";
import { usePokemonDetails } from "../services/api/pokemon";
import { PokemonStats } from "../components/pokemon/PokemonSeats";
import SkeletonLoader from "../components/pekemon-details/SkeletonLoader";
import TypeBadge from "../components/pekemon-details/TypeBadge";
import InfoCard from "../components/pekemon-details/InfoCard";
import AbilityBadge from "../components/pekemon-details/AbilityBadge";


const PokemonDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = usePokemonDetails(Number(id));

  // Handle loading state
  if (isLoading) return <SkeletonLoader />;

  // Handle error or empty data
  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto p-4 text-center">
        <p className="text-red-500 font-medium mb-2">
          Failed to load Pokémon data.
        </p>
        <Link
          to="/"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          ← Back to List
        </Link>
      </div>
    );
  }

  //  Derived Data
  const formattedId = `#${String(data.id).padStart(3, "0")}`;
  const formattedHeight = `${data.height / 10} m`;
  const formattedWeight = `${data.weight / 10} kg`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-10 px-4 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full max-w-4xl mb-6 px-2">
        <Link
          to="/"
          className="inline-flex items-center text-sm px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm transition"
        >
          ← Back to List
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-4xl bg-white rounded-md shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-4">
          <h1 className="text-3xl font-bold capitalize">⚡ {data.name}</h1>
          <p className="text-sm mt-1">{formattedId}</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 p-8 items-start">
          {/* Left Section */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4 shadow-inner">
              <img
                src={data.sprites.front_default}
                alt={data.name}
                className="w-32 h-32 object-contain"
                loading="lazy"
              />
            </div>

            {/* Types */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {data.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} />
              ))}
            </div>

            {/* Height & Weight */}
            <div className="flex gap-6">
              <InfoCard label="Height" value={formattedHeight} />
              <InfoCard label="Weight" value={formattedWeight} />
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Base Stats</h2>
            <PokemonStats stats={data.stats} />

            <h2 className="text-lg font-semibold mb-2">Abilities</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {data.abilities.map((a) => (
                <AbilityBadge
                  key={a.ability.name}
                  ability={a.ability.name}
                  isHidden={a.is_hidden}
                />
              ))}
            </div>

            <p className="font-semibold text-purple-600 text-base">
              {data.base_experience} XP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
