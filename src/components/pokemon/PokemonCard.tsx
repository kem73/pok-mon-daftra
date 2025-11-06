import { Link } from "react-router-dom";
import { memo } from "react";

interface PokemonCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

const PokemonCard: React.FC<PokemonCardProps> = memo(({ id, name, imageUrl }) => {
  const formattedId = `#${id.toString().padStart(3, "0")}`;
  return (
    <Link
      to={`/pokemon/${id}`}
      className="group block rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
      aria-label={`View details for ${name}`}
    >
      <div className="relative flex justify-center items-center bg-gray-100 rounded-full w-32 h-32 mx-auto overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h2 className="mt-3 capitalize font-semibold text-gray-800 group-hover:text-yellow-500 transition-colors">
        {name}
      </h2>
      <p className="text-sm text-gray-500">{formattedId}</p>
    </Link>
  );
});

PokemonCard.displayName = "PokemonCard";
export default PokemonCard;
