import React, { useState } from 'react';
import { useComparison } from '../../hooks/useComparison';

const ComparisonPanel: React.FC = () => {
  const { comparedProducts, removeProduct, clearAll } = useComparison();
  const [isExpanded, setIsExpanded] = useState(false);

  if (comparedProducts.length === 0) {
    return null;
  }

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.33)' }}
          onClick={() => setIsExpanded(false)}
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Comparison Panel */}
      <div
        className={`fixed bg-white shadow-2xl border-2 border-gray-200 z-50 transition-all duration-300 ease-in-out rounded-lg max-w-[1280px] left-1/2 -translate-x-1/2 ${
          isExpanded ? 'bottom-4 h-[66vh]' : 'bottom-4'
        } ${isExpanded ? 'w-[calc(100%-2rem)]' : 'w-[calc(100%-2rem)] h-24'}`}
        role={isExpanded ? "dialog" : "complementary"}
        aria-label={isExpanded ? "Product comparison dialog" : "Product comparison panel"}
        aria-modal={isExpanded ? "true" : undefined}
      >
        {!isExpanded ? (
          // Collapsed View
          <div className="h-full px-6 py-4">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-4 flex-1 overflow-x-auto">
                {comparedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 whitespace-nowrap"
                    role="listitem"
                  >
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="w-10 h-10 object-contain"
                        aria-hidden="true"
                      />
                    )}
                    <span className="text-sm font-medium truncate max-w-[150px]">
                      {product.title}
                    </span>
                    <button
                      onClick={() => removeProduct(product.id)}
                      aria-label={`Remove ${product.title} from comparison`}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={clearAll}
                  aria-label="Clear all products from comparison"
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsExpanded(true)}
                  aria-label={`Compare ${comparedProducts.length} products`}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Compare ({comparedProducts.length}/5)
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Expanded View
          <div className="h-full flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-2xl font-bold">Product Comparison</h2>
              <button
                onClick={() => setIsExpanded(false)}
                aria-label="Close comparison panel"
                className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <table className="w-full border-collapse">
                <caption className="sr-only">Product comparison table showing {comparedProducts.length} products</caption>
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-4 font-semibold bg-gray-50 sticky left-0 z-10" scope="col">
                      Product
                    </th>
                    {comparedProducts.map((product) => (
                      <th key={product.id} className="p-4 text-center min-w-[200px]" scope="col">
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => removeProduct(product.id)}
                            aria-label={`Remove ${product.title} from comparison`}
                            className="self-end text-red-500 hover:text-red-700 text-xl"
                          >
                            ✕
                          </button>
                          {product.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt=""
                              className="w-24 h-24 object-contain"
                              aria-hidden="true"
                            />
                          )}
                          <span className="text-sm font-medium">{product.title}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price Row */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <th className="p-4 font-semibold bg-gray-50 sticky left-0 text-left" scope="row">Price</th>
                    {comparedProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold text-blue-600">
                            £{product.price.toFixed(2)}
                          </span>
                          {product.isOnPromotion && product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              £{product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Rating Row */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <th className="p-4 font-semibold bg-gray-50 sticky left-0 text-left" scope="row">Rating</th>
                    {comparedProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.averageRating !== undefined ? (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-yellow-500" aria-hidden="true">
                              {'★'.repeat(Math.round(product.averageRating))}
                            </span>
                            <span className="text-sm" aria-label={`${product.averageRating.toFixed(1)} out of 5 stars`}>{product.averageRating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">No rating</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Reviews Row */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <th className="p-4 font-semibold bg-gray-50 sticky left-0 text-left" scope="row">Reviews</th>
                    {comparedProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.reviewsCount !== undefined && product.reviewsCount > 0 ? (
                          <span>{product.reviewsCount} reviews</span>
                        ) : (
                          <span className="text-gray-400">No reviews</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Discount Row */}
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <th className="p-4 font-semibold bg-gray-50 sticky left-0 text-left" scope="row">Discount</th>
                    {comparedProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.discountPercentage ? (
                          <span className="text-green-600 font-semibold">
                            {product.discountPercentage}% off
                          </span>
                        ) : (
                          <span className="text-gray-400">No discount</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ComparisonPanel;
