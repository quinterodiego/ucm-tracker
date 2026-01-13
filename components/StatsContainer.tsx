interface StatsContainerProps {
  watchedCount: number;
  totalCount: number;
  progress: number;
}

export default function StatsContainer({
  watchedCount,
  totalCount,
  progress,
}: StatsContainerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      <div className="bg-card-bg rounded-2xl p-6 text-center border-2 border-border-color transition-transform hover:scale-105 hover:shadow-lg hover:shadow-highlight/30">
        <div className="text-4xl font-bold text-highlight mb-2">
          {watchedCount}
        </div>
        <div className="text-text-secondary text-sm uppercase tracking-wider">
          Vistas
        </div>
      </div>
      <div className="bg-card-bg rounded-2xl p-6 text-center border-2 border-border-color transition-transform hover:scale-105 hover:shadow-lg hover:shadow-highlight/30">
        <div className="text-4xl font-bold text-highlight mb-2">
          {totalCount}
        </div>
        <div className="text-text-secondary text-sm uppercase tracking-wider">
          Total
        </div>
      </div>
      <div className="bg-card-bg rounded-2xl p-6 text-center border-2 border-border-color transition-transform hover:scale-105 hover:shadow-lg hover:shadow-highlight/30">
        <div className="text-4xl font-bold text-highlight mb-2">
          {progress}%
        </div>
        <div className="text-text-secondary text-sm uppercase tracking-wider">
          Progreso
        </div>
      </div>
    </div>
  );
}
