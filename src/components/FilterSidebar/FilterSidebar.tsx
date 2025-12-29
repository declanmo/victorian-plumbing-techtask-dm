import React from 'react';
import type { ApiFacetGroup, FacetFilterValue } from '../../api/listings.types';

interface FilterSidebarProps {
  availableFacets: ApiFacetGroup[];
  selectedFacets: Record<string, FacetFilterValue[]>;
  onFacetChange: (facetKey: string, facetValues: FacetFilterValue[]) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  availableFacets,
  selectedFacets,
  onFacetChange,
}) => {

  const handlePillClick = (
    facetKey: string,
    identifier: string,
    value: string | { gte: number; lte: number }
  ) => {
    const currentSelection = selectedFacets[facetKey] || [];
    const isSelected = currentSelection.some((item) => item.identifier === identifier);
    
    if (isSelected) {
      const filtered = currentSelection.filter((item) => item.identifier !== identifier);
      onFacetChange(facetKey, filtered);
    } else {
      const newValue: FacetFilterValue = typeof value === 'string'
        ? { identifier, value }
        : { identifier, value };
      onFacetChange(facetKey, [...currentSelection, newValue]);
    }
  };

  const isSelected = (facetKey: string, identifier: string): boolean => {
    const currentSelection = selectedFacets[facetKey] || [];
    return currentSelection.some((item) => item.identifier === identifier);
  };

  const formatDisplayValue = (value: string, facetType: string): string => {
    if (facetType === 'prices' && value.includes(' - ')) {
      const parts = value.split(' - ');
      return `£${parts[0]} - £${parts[1]}`;
    }
    if (facetType === 'prices' && value.endsWith(' - ')) {
      return value.replace(' - ', '+').replace(/^/, '£');
    }
    return value;
  };

  return (
    <aside className="w-64 bg-white p-4 rounded-lg shadow max-h-screen overflow-y-auto" aria-label="Product filters">
      <h2 className="text-xl font-bold mb-4">Filter By</h2>

      {availableFacets.map((facetGroup) => {
        if (!facetGroup.options || facetGroup.options.length === 0) {
          return null;
        }

        return (
          <fieldset key={facetGroup.identifier} className="mb-6 border-0 p-0">
            <legend className="font-semibold mb-3 text-gray-700">
              {facetGroup.displayName}
            </legend>
            
            <div className="flex flex-wrap gap-2">
              {facetGroup.options.map((option) => {
                const selected = isSelected(facetGroup.identifier, option.identifier);
                const value = option.value as string | { gte: number; lte: number };
                const displayValue = formatDisplayValue(option.displayValue, facetGroup.identifier);
                const isDisabled = option.productCount === 0 && !selected;
                
                return (
                  <button
                    key={option.identifier}
                    onClick={() => handlePillClick(facetGroup.identifier, option.identifier, value)}
                    disabled={isDisabled}
                    aria-pressed={selected}
                    aria-label={`${displayValue}, ${option.productCount} products${selected ? ', selected' : ''}${isDisabled ? ', no products available' : ''}`}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selected
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : isDisabled
                        ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span aria-hidden="true">{displayValue}</span>
                    <span className={`ml-1 text-xs ${
                      selected ? 'text-blue-200' : isDisabled ? 'text-gray-400' : 'text-gray-500'
                    }`} aria-hidden="true">
                      ({option.productCount})
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      {availableFacets.length === 0 && (
        <p className="text-gray-500 text-sm">No filters available</p>
      )}
    </aside>
  );
};

export default FilterSidebar;
