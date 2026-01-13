interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="w-full h-8 bg-card-bg rounded-2xl overflow-hidden border-2 border-border-color relative">
        <div
          className="h-full bg-gradient-to-r from-highlight to-pink-400 transition-all duration-500 flex items-center justify-center text-white font-bold text-sm"
          style={{ width: `${progress}%` }}
        >
          {progress > 0 && `${progress}%`}
        </div>
      </div>
    </div>
  );
}
