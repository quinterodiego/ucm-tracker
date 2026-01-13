"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import StatsContainer from "@/components/StatsContainer";
import ProgressBar from "@/components/ProgressBar";
import Controls from "@/components/Controls";
import Timeline from "@/components/Timeline";
import { ucmData } from "@/data/ucmData";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [watchedItems, setWatchedItems] = useState<Set<number>>(new Set());
  const [currentFilter, setCurrentFilter] = useState<
    "all" | "movies" | "series" | "watched" | "unwatched"
  >("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      loadWatchedItems();
    }
  }, [status, router]);

  const loadWatchedItems = async () => {
    try {
      const response = await fetch("/api/watched");
      if (response.ok) {
        const data = await response.json();
        setWatchedItems(new Set(data.watchedItems || []));
      }
    } catch (error) {
      console.error("Error loading watched items:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWatched = async (itemId: number) => {
    const isWatched = watchedItems.has(itemId);
    const newWatchedItems = new Set(watchedItems);

    if (isWatched) {
      newWatchedItems.delete(itemId);
      setWatchedItems(newWatchedItems);
      await fetch("/api/watched", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
    } else {
      newWatchedItems.add(itemId);
      setWatchedItems(newWatchedItems);
      await fetch("/api/watched", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
    }
  };

  const markAllAsWatched = async () => {
    const allIds = ucmData.map((item) => item.id);
    const newSet = new Set(allIds);
    setWatchedItems(newSet);

    for (const id of allIds) {
      await fetch("/api/watched", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id }),
      });
    }
  };

  const unmarkAll = async () => {
    const allIds = Array.from(watchedItems);
    setWatchedItems(new Set());

    for (const id of allIds) {
      await fetch("/api/watched", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id }),
      });
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const watchedCount = watchedItems.size;
  const totalCount = ucmData.length;
  const progress = totalCount > 0 ? Math.round((watchedCount / totalCount) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header />
      <StatsContainer
        watchedCount={watchedCount}
        totalCount={totalCount}
        progress={progress}
      />
      <ProgressBar progress={progress} />
      <Controls
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        onMarkAll={markAllAsWatched}
        onUnmarkAll={unmarkAll}
      />
      <Timeline
        items={ucmData}
        watchedItems={watchedItems}
        currentFilter={currentFilter}
        onToggleWatched={toggleWatched}
      />
    </div>
  );
}
