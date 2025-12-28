import React, { useEffect } from 'react';
import { useListings } from './useListings';
// import { SortOption } from '../../api/listings.types';
import SortSelect from '../../components/SortSelect/SortSelect';
import ProductCard from '../../components/ProductCard/ProductCard';

interface ListingsPageProps {
  query: string;
}

const ListingsPage: React.FC<ListingsPageProps> = ({ query }) => {
  const {
    products,
    sort,
    setSort,
    loadMore,
    hasMore,
    isLoading,
    error,
    refetch,
  } = useListings({ query });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <section className="p-4">
      <div className="mb-4 flex justify-end">
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default ListingsPage;
