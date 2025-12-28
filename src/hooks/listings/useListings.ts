import { useCallback, useState } from 'react';
import { fetchListings } from '../../api/listingsClient';
import { 
  SortOption, 
  type ListingsRequest, 
  type FacetFilterValue,
  type ApiFacetGroup 
} from '../../api/listings.types';
import type { Product } from '../../api/listingsClient';

interface UseListingsOptions {
  query: string;
  pageSize?: number;
  initialSort?: SortOption;
}

export const useListings = ({
  query,
  pageSize = 24,
  initialSort = SortOption.Recommended,
}: UseListingsOptions) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFacets, setSelectedFacets] = useState<Record<string, FacetFilterValue[]>>({});
  const [availableFacets, setAvailableFacets] = useState<ApiFacetGroup[]>([]);

  const loadListings = useCallback(
    async (reset = false) => {
      setIsLoading(true);
      setError(null);

      const request: ListingsRequest = {
        query,
        pageNumber: reset ? 0 : pageNumber,
        size: pageSize,
        sort,
        facets: Object.keys(selectedFacets).length > 0 ? selectedFacets : undefined,
      };

      try {
        const response = await fetchListings(request);

        setProducts((prev) =>
          reset ? response.products : [...prev, ...response.products]
        );
        setTotalResults(response.totalResults);
        setPageNumber((prev) => (reset ? 1 : prev + 1));

        if (response.facets) {
          setAvailableFacets(response.facets);
        }
      } catch {
        setError('Something went wrong while loading products.');
      } finally {
        setIsLoading(false);
      }
    },
    [query, pageNumber, pageSize, sort, selectedFacets]
  );

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setPageNumber(0);
    loadListings(true);
  };

  const handleFacetChange = (facetKey: string, facetValues: FacetFilterValue[]) => {
    setSelectedFacets((prev) => {
      const updated = { ...prev };
      if (facetValues.length === 0) {
        delete updated[facetKey];
      } else {
        updated[facetKey] = facetValues;
      }
      return updated;
    });
    setPageNumber(0);
  };

  const loadMore = () => {
    if (products.length < totalResults && !isLoading) {
      loadListings();
    }
  };

  const refetch = useCallback(() => {
    loadListings(true);
  }, [loadListings]);

  return {
    products,
    totalResults,
    sort,
    setSort: handleSortChange,
    isLoading,
    error,
    loadMore,
    hasMore: products.length < totalResults,
    refetch,
    availableFacets,
    selectedFacets,
    setFacets: handleFacetChange,
  };
};