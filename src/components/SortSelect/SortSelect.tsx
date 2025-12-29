import React from 'react';
import { SortOption } from '../../api/listings.types';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: SortOption.Recommended, label: 'Recommended' },
  { value: SortOption.PriceLowToHigh, label: 'Price: Low to High' },
  { value: SortOption.PriceHighToLow, label: 'Price: High to Low' },
  { value: SortOption.LargestDiscount, label: 'Largest Discount' },
];

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort-select" className="text-sm font-medium">Sort by:</label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as SortOption)}
        aria-label="Sort products by"
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;
