import React from 'react';
import type { Product } from '../../api/listingsClient';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex flex-col">
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="object-contain w-full h-full"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Product Title */}
      <h2 className="text-lg font-semibold mb-2 line-clamp-2">
        {product.title}
      </h2>

      {/* Pricing */}
      <div className="mt-auto">
        <p className="text-blue-600 font-bold">
          £{product.price.toFixed(2)}
        </p>
        {product.originalPrice && product.originalPrice > product.price && (
          <p className="text-gray-400 line-through text-sm">
            £{product.originalPrice.toFixed(2)}
          </p>
        )}
        {product.discountPercentage && (
          <p className="text-green-600 text-sm font-medium">
            {product.discountPercentage}% off
          </p>
        )}
      </div>

      {/* Optional: Shortlist / Compare buttons can go here */}
    </article>
  );
};

export default ProductCard;
