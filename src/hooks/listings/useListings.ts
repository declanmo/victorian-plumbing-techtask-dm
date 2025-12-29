import { useCallback, useRef, useState } from 'react';
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
  const pageNumberRef = useRef(1);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const sortRef = useRef<SortOption>(initialSort);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFacets, setSelectedFacets] = useState<Record<string, FacetFilterValue[]>>({});
  const selectedFacetsRef = useRef<Record<string, FacetFilterValue[]>>({});
  const [availableFacets, setAvailableFacets] = useState<ApiFacetGroup[]>([]);
  const allFacetsRef = useRef<Record<string, ApiFacetGroup>>({});

  const loadListings = useCallback(
    async (reset = false) => {
      setIsLoading(true);
      setError(null);

      const request: ListingsRequest = {
        query,
        pageNumber: reset ? 1 : pageNumberRef.current,
        size: pageSize,
        sort: sortRef.current,
        facets: Object.keys(selectedFacetsRef.current).length > 0 ? selectedFacetsRef.current : undefined,
      };

      try {
        const response = await fetchListings(request);

        setProducts((prev) =>
          reset ? response.products : [...prev, ...response.products]
        );
        setTotalResults(response.totalResults);
        pageNumberRef.current = reset ? 2 : pageNumberRef.current + 1;
        
        if (response.facets) {
          response.facets.forEach((facet) => {
            if (!allFacetsRef.current[facet.identifier]) {
              // First time seeing this facet - just store it
              allFacetsRef.current[facet.identifier] = facet;
            } else {
              const apiOptionsMap = new Map(
                facet.options.map(o => [o.identifier, o])
              );
              
              const mergedOptions = allFacetsRef.current[facet.identifier].options.map(existingOption => {
                const apiOption = apiOptionsMap.get(existingOption.identifier);
                if (apiOption) {
                  return apiOption;
                } else {
                  return { ...existingOption, productCount: 0 };
                }
              });
              
              // Add any new options from API that we haven't seen before
              facet.options.forEach(apiOption => {
                if (!allFacetsRef.current[facet.identifier].options.some(o => o.identifier === apiOption.identifier)) {
                  mergedOptions.push(apiOption);
                }
              });
              
              allFacetsRef.current[facet.identifier] = {
                ...facet,
                options: mergedOptions
              };
            }
          });
          setAvailableFacets(Object.values(allFacetsRef.current));
        }
      } catch {
        setError('Something went wrong while loading products.');
      } finally {
        setIsLoading(false);
      }
    },
    [query, pageSize]
  );

  const handleSortChange = (newSort: SortOption) => {
    sortRef.current = newSort;
    setSort(newSort);
    pageNumberRef.current = 1;
    loadListings(true);
  };

  const handleFacetChange = (facetKey: string, facetValues: FacetFilterValue[]) => {
    const updated = { ...selectedFacets };
    if (facetValues.length === 0) {
      delete updated[facetKey];
    } else {
      updated[facetKey] = facetValues;
    }
    
    selectedFacetsRef.current = updated;
    setSelectedFacets(updated);
    pageNumberRef.current = 1;
    loadListings(true);
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