"use client";

interface ControlsProps {
  currentFilter: "all" | "movies" | "series" | "watched" | "unwatched";
  onFilterChange: (filter: ControlsProps["currentFilter"]) => void;
  onMarkAll: () => void;
  onUnmarkAll: () => void;
}

const filterLabels = {
  all: "Todas",
  movies: "Películas",
  series: "Series",
  watched: "Vistas",
  unwatched: "No vistas",
};

const filters: ControlsProps["currentFilter"][] = [
  "all",
  "movies",
  "series",
  "watched",
  "unwatched",
];

export default function Controls({
  currentFilter,
  onFilterChange,
  onMarkAll,
  onUnmarkAll,
}: ControlsProps) {
  const currentIndex = filters.indexOf(currentFilter);
  const nextFilter = filters[(currentIndex + 1) % filters.length];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      <button
        onClick={onMarkAll}
        className="px-6 py-3 bg-card-bg hover:bg-card-hover border-2 border-border-color rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-highlight/20 font-semibold"
      >
        Marcar todas como vistas
      </button>
      <button
        onClick={onUnmarkAll}
        className="px-6 py-3 bg-card-bg hover:bg-card-hover border-2 border-border-color rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-highlight/20 font-semibold"
      >
        Desmarcar todas
      </button>
      <button
        onClick={() => onFilterChange(nextFilter)}
        className="px-6 py-3 bg-accent hover:bg-card-hover border-2 border-border-color rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-highlight/20 font-semibold"
      >
        Mostrar: {filterLabels[nextFilter]}
      </button>
    </div>
  );
}
