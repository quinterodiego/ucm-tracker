"use client";

import Image from "next/image";
import { UCMItem } from "@/data/ucmData";

interface TimelineProps {
  items: UCMItem[];
  watchedItems: Set<number>;
  currentFilter: "all" | "movies" | "series" | "watched" | "unwatched";
  onToggleWatched: (itemId: number) => void;
}

export default function Timeline({
  items,
  watchedItems,
  currentFilter,
  onToggleWatched,
}: TimelineProps) {
  let filteredData = items;

  if (currentFilter === "movies") {
    filteredData = items.filter((item) => item.type === "movie");
  } else if (currentFilter === "series") {
    filteredData = items.filter(
      (item) => item.type === "series" || item.type === "special"
    );
  } else if (currentFilter === "watched") {
    filteredData = items.filter((item) => watchedItems.has(item.id));
  } else if (currentFilter === "unwatched") {
    filteredData = items.filter((item) => !watchedItems.has(item.id));
  }

  return (
    <div className="flex flex-col gap-5">
      {filteredData.map((item) => {
        const isWatched = watchedItems.has(item.id);
        const typeLabel =
          item.type === "movie"
            ? "Película"
            : item.type === "series"
            ? "Serie"
            : "Especial";

        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <div
            key={item.id}
            className={`bg-card-bg rounded-2xl p-6 border-2 transition-all hover:translate-x-2 hover:border-highlight hover:shadow-lg hover:shadow-highlight/20 flex items-center gap-5 relative overflow-hidden ${
              isWatched ? "opacity-70 border-success" : "border-border-color"
            } ${
              item.type === "movie"
                ? "before:bg-movie"
                : item.type === "series"
                ? "before:bg-series"
                : "before:bg-border-color"
            } ${
              isWatched ? "before:bg-success" : ""
            } before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1`}
          >
            <div className="relative w-8 h-8 flex-shrink-0">
              <input
                type="checkbox"
                id={`item-${item.id}`}
                checked={isWatched}
                onChange={() => onToggleWatched(item.id)}
                className="w-full h-full cursor-pointer opacity-0 absolute z-10"
              />
              <label
                htmlFor={`item-${item.id}`}
                className={`w-full h-full border-3 rounded-lg flex items-center justify-center transition-all ${
                  isWatched
                    ? "bg-success border-success"
                    : "border-border-color bg-transparent"
                }`}
              >
                {isWatched && (
                  <span className="text-white text-xl font-bold">✓</span>
                )}
              </label>
            </div>

            <div className="w-24 h-36 flex-shrink-0 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={150}
                className="w-full h-full object-cover"
                unoptimized={item.image.startsWith("/")}
              />
            </div>

            <div className="flex-1">
              <div className="text-xl font-bold mb-2">{item.title}</div>
              <div className="flex gap-4 flex-wrap items-center text-text-secondary text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                    item.type === "movie"
                      ? "bg-movie/20 text-movie"
                      : "bg-series/20 text-series"
                  }`}
                >
                  {typeLabel}
                </span>
                <span className="flex items-center gap-1">
                  📅 {formattedDate}
                </span>
                <span className="px-3 py-1 rounded-full bg-highlight/20 text-highlight text-xs font-semibold">
                  {item.phase}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
