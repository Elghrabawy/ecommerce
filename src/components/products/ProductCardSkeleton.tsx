import { ViewMode } from "@/types";

export function ProductCardSkeleton({ viewMode }: { viewMode: ViewMode }) {
  return viewMode === "list" ? (
    <div className="flex flex-col group bg-background border border-border/40 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted/60 relative" />
      <div className="h-full">
        <div className="p-4 flex justify-between flex-col h-full">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-4 w-16 bg-muted rounded" />
              <div className="h-4 w-10 bg-muted rounded" />
            </div>
            <div className="h-5 w-3/4 bg-muted rounded mb-2" />
            <div className="flex items-center gap-2 mt-2">
              <div className="h-4 w-4 bg-muted rounded-full" />
              <div className="h-4 w-8 bg-muted rounded" />
              <div className="h-3 w-8 bg-muted rounded" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="h-6 w-16 bg-muted rounded" />
            <div className="h-8 w-20 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col group bg-background border border-border/40 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted/60 relative" />
      <div className="h-full">
        <div className="p-4 flex justify-between flex-col h-full">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-4 w-16 bg-muted rounded" />
              <div className="h-4 w-10 bg-muted rounded" />
            </div>
            <div className="h-5 w-3/4 bg-muted rounded mb-2" />
            <div className="flex items-center gap-2 mt-2">
              <div className="h-4 w-4 bg-muted rounded-full" />
              <div className="h-4 w-8 bg-muted rounded" />
              <div className="h-3 w-8 bg-muted rounded" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="h-6 w-16 bg-muted rounded" />
            <div className="h-8 w-20 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
