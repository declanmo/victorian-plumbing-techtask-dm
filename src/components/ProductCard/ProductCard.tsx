import React from 'react';
import type { Product } from '../../api/listingsClient';
import { useComparison } from '../../hooks/useComparison';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addProduct, removeProduct, isComparing, canAddMore } = useComparison();
  const isInComparison = isComparing(product.id);

  const handleCompareClick = () => {
    if (isInComparison) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  };

  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex flex-col" aria-label={`Product: ${product.title}`}>
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden relative">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="object-contain w-full h-full"
          />
        ) : (
          <span className="text-gray-400" role="img" aria-label="No image available">No Image</span>
        )}
        {product.isOnPromotion && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded" role="status" aria-label="On sale">
            SALE
          </div>
        )}
      </div>

      {/* Product Title */}
      <h2 className="text-lg font-semibold mb-2 line-clamp-2">
        {product.title}
      </h2>

      {/* Pricing */}
      <div className="mt-auto">
        <div className="flex items-center gap-2">
          <p className="text-blue-600 font-bold" aria-label={`Current price £${product.price.toFixed(2)}`}>
            £{product.price.toFixed(2)}
          </p>
          {product.isOnPromotion && product.originalPrice && product.originalPrice > product.price && (
            <p className="text-gray-400 line-through text-sm" aria-label={`Original price £${product.originalPrice.toFixed(2)}`}>
              £{product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
        {product.discountPercentage && (
          <p className="text-green-600 text-sm font-medium" aria-label={`${product.discountPercentage} percent discount`}>
            {product.discountPercentage}% off
          </p>
        )}
        
        {/* Rating and Reviews */}
        {product.averageRating !== undefined && (
          <div className="flex items-center gap-1 mt-2" role="group" aria-label={`Rating: ${product.averageRating.toFixed(1)} out of 5 stars${product.reviewsCount ? `, ${product.reviewsCount} reviews` : ''}`}>
            <span className="text-yellow-500" aria-hidden="true">
              {'★'.repeat(Math.round(product.averageRating))}
            </span>
            <span className="text-sm font-medium" aria-hidden="true">{product.averageRating.toFixed(1)}</span>
            {product.reviewsCount !== undefined && product.reviewsCount > 0 && (
              <span className="text-gray-500 text-sm" aria-hidden="true">({product.reviewsCount})</span>
            )}
          </div>
        )}
      </div>

      {/* Compare Button */}
      <button
        onClick={handleCompareClick}
        disabled={!isInComparison && !canAddMore}
        aria-label={isInComparison ? `Remove ${product.title} from comparison` : `Add ${product.title} to comparison`}
        aria-pressed={isInComparison}
        className={`mt-3 w-full py-2 rounded-lg font-medium transition-colors ${
          isInComparison
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : canAddMore
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
        }`}
      >
        {isInComparison ? 'Remove from Compare' : 'Compare'}
      </button>
    </article>
  );
};

export default ProductCard;
