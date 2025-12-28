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

  const handleCheckboxChange = (
    facetKey: string,
    identifier: string,
    value: string | { gte: number; lte: number },
    isChecked: boolean
  ) => {
    const currentSelection = selectedFacets[facetKey] || [];
    
    if (isChecked) {
      // Add to selection
      const newValue: FacetFilterValue = typeof value === 'string'
        ? { identifier, value }
        : { identifier, value };
      onFacetChange(facetKey, [...currentSelection, newValue]);
    } else {
      // Remove from selection
      const filtered = currentSelection.filter(
        (item) => item.identifier !== identifier
      );
      onFacetChange(facetKey, filtered);
    }
  };

  const isSelected = (facetKey: string, identifier: string): boolean => {
    const currentSelection = selectedFacets[facetKey] || [];
    return currentSelection.some((item) => item.identifier === identifier);
  };

  return (
    <aside className="w-64 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Filter By</h2>

      {availableFacets?.map((facetGroup) => {
        if (!facetGroup.options || facetGroup.options.length === 0) {
          return null;
        }

        return (
          <div key={facetGroup.identifier} className="mb-6">
            <h3 className="font-semibold mb-2 text-gray-700">
              {facetGroup.displayName}
            </h3>
            
            <div className="space-y-2">
              {facetGroup.options.map((option) => {
                const checked = isSelected(facetGroup.identifier, option.identifier);
                const value = option.value as string | { gte: number; lte: number };
                
                return (
                  <label
                    key={option.identifier}
                    className="flex items-start space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        handleCheckboxChange(
                          facetGroup.identifier,
                          option.identifier,
                          value,
                          e.target.checked
                        )
                      }
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">
                      {option.displayValue}
                      <span className="text-gray-400 ml-1">
                        ({option.productCount})
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      {(!availableFacets || availableFacets.length === 0) && (
        <p className="text-gray-500 text-sm">No filters available</p>
      )}
    </aside>
  );
};

export default FilterSidebar;
