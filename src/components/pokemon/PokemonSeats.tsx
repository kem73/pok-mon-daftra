import { useEffect, useState, memo } from "react";





interface Stat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonStatsProps {
  stats: Stat[];
}

export const PokemonStats: React.FC<PokemonStatsProps> = memo(({ stats }) => {
  const [animatedStats, setAnimatedStats] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(stats.map((s) => Math.min(100, s.base_stat)));
    }, 150);

    return () => clearTimeout(timer);
  }, [stats]);

  const formatLabel = (name: string) => {
    switch (name) {
      case "special-attack":
        return "Sp. Attack";
      case "special-defense":
        return "Sp. Defense";
      case "hp":
        return "HP";
      default:
        return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }
  };

  return (
    <section className="space-y-3 mb-6">
      {stats.map((s, i) => {
        const label = formatLabel(s.stat.name);
        const value = Math.min(s.base_stat, 100);
        const width = animatedStats[i] ?? 0;

        // Color-coding based on value
        const barColor =
          value >= 80
            ? "bg-green-500"
            : value >= 50
            ? "bg-yellow-400"
            : "bg-red-400";

        return (
          <div key={s.stat.name}>
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>{label}</span>
              <span>{s.base_stat}</span>
            </div>

            <div
              className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={s.base_stat}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${label} stat`}
            >
              <div
                className={`h-2 ${barColor} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
});

PokemonStats.displayName = "PokemonStats";
