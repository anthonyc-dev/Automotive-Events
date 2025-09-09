"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const categories = [
  { id: "RALLY", label: "Rally" },
  { id: "EXHIBITION", label: "Exhibition" },
  { id: "SHOW", label: "Show" },
  { id: "RACE", label: "Race" },
  { id: "TRACK_DAY", label: "Track Day" },
  { id: "MEET_UP", label: "Meet Up" },
  { id: "CONFERENCE", label: "Conference" },
  { id: "OTHER", label: "Other" },
];

const priceRanges = [
  { id: "free", label: "Free", min: 0, max: 0 },
  { id: "under-25", label: "Under $25", min: 0, max: 25 },
  { id: "25-50", label: "$25 - $50", min: 25, max: 50 },
  { id: "50-100", label: "$50 - $100", min: 50, max: 100 },
  { id: "over-100", label: "Over $100", min: 100, max: Infinity },
];

export function EventsFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState(true);
  const [showPrices, setShowPrices] = useState(true);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePriceRangeChange = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((id) => id !== rangeId)
        : [...prev, rangeId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
  };

  return (
    <div className="bg-background border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        {(selectedCategories.length > 0 || selectedPriceRanges.length > 0) && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="mb-6">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          Categories
          {showCategories ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showCategories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm">{category.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => setShowPrices(!showPrices)}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          Price Range
          {showPrices ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showPrices && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(range.id)}
                  onChange={() => handlePriceRangeChange(range.id)}
                  className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Date Range */}
      <div>
        <h4 className="font-medium mb-3">Date Range</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              From
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              To
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
