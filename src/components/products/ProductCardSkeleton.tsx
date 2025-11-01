import { ViewMode } from "@/types";

export function ProductCardSkeleton({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "list") {
    return (
      <div className="flex flex-row gap-4 bg-secondary/10 border border-border/40 rounded-2xl overflow-hidden animate-pulse p-3">
        <div className="w-32 sm:w-40 lg:w-44 aspect-square bg-muted/50 rounded-xl" />

        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-20 bg-muted rounded-full" />
              <div className="h-4 w-12 bg-muted rounded-full" />
            </div>

            <div className="h-5 w-3/4 bg-muted rounded mb-2" />

            <div className="h-4 w-full bg-muted/70 rounded mb-1" />
            <div className="h-4 w-5/6 bg-muted/70 rounded mb-3" />

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted rounded-full" />
              <div className="h-4 w-8 bg-muted rounded" />
              <div className="h-3 w-8 bg-muted rounded" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="h-6 w-20 bg-muted rounded" />
            <div className="flex gap-2">
              <div className="h-9 w-24 bg-muted rounded-xl" />
              <div className="h-9 w-9 bg-muted rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col bg-secondary/10 border border-border/40 rounded-2xl overflow-hidden animate-pulse">
      <div className="relative aspect-square bg-muted/60">
        <div className="absolute top-3 right-3 h-8 w-8 bg-white/40 dark:bg-black/30 rounded-full backdrop-blur-sm" />

        <div className="absolute left-3 bottom-3 h-6 w-20 bg-primary/40 rounded-full" />

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-4 bg-muted/90 rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 w-16 bg-muted rounded-full" />
            <div className="h-4 w-10 bg-muted rounded-full" />
          </div>

          <div className="h-5 w-3/4 bg-muted rounded mb-2" />

          <div className="h-4 w-full bg-muted/80 rounded mb-1" />
          <div className="h-4 w-5/6 bg-muted/80 rounded mb-3" />

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-muted rounded-full" />
            <div className="h-4 w-8 bg-muted rounded" />
            <div className="h-3 w-8 bg-muted rounded" />
          </div>
        </div>

        <div className="mt-4 flex">
          <div className="h-10 w-full bg-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}
