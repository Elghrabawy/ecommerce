import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Grid3x3,
  List,
  Search,
  Filter,
} from "lucide-react";
import "nprogress/nprogress.css";

import {
  ViewMode,
} from "@/types";

export function Toolbar({
  viewMode,
  setViewMode,
  searchInput,
  setSearchInput,
  sort,
  setSort,
  onOpenFilters,
  total,
}: {
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  searchInput: string;
  setSearchInput: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  onOpenFilters: () => void;
  total: number;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-black">All Products</h1>
        <p className="text-muted-foreground">Showing {total} products</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="pl-9 h-11 rounded-xl"
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-11 rounded-xl w-full lg:w-[220px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-sold">Featured</SelectItem>
            <SelectItem value="price">Price: Low to High</SelectItem>
            <SelectItem value="-price">Price: High to Low</SelectItem>
            <SelectItem value="-ratingsAverage">Top Rated</SelectItem>
            <SelectItem value="-createdAt">Newest</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-11 rounded-xl lg:hidden"
            onClick={onOpenFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            className="h-11 w-11 rounded-xl"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <Grid3x3 className="h-5 w-5" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            className="h-11 w-11 rounded-xl"
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
