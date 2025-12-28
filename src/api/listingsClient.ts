import type {
    ListingsRequest,
    ListingsResponse,
    ApiProduct,
  } from './listings.types';
  
  const API_URL =
    'https://spanishinquisition.victorianplumbing.co.uk/interviews/listings';
  const API_KEY = 'yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI';
  
  export interface Product {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
    discountPercentage?: number;
  }
  
const mapApiProductToProduct = (product: ApiProduct): Product => {
  const price = Number(product.price.priceIncTax);
  const originalPrice = product.price.wasPrice ? Number(product.price.wasPrice) : undefined;
  
  // Calculate discount percentage if there's a wasPrice
  const discountPercentage = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : undefined;

  return {
    id: product.id,
    title: product.productName,
    price,
    originalPrice,
    imageUrl: product.image?.url,
    discountPercentage,
  };
};
  
  /**
   * Fetch listings from the API
   */
  export const fetchListings = async (
    payload: ListingsRequest
  ): Promise<{
    products: Product[];
    totalResults: number;
    facets?: ListingsResponse['facets'];
  }> => {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch listings');
    }
  
    const data: ListingsResponse = await response.json();
  
    return {
      products: data.products.map(mapApiProductToProduct),
      totalResults: data.totalResults,
      facets: data.facets,
    };
  };
  