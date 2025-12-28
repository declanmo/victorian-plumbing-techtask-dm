/**
 * Sort options accepted by the API
 */
export const SortOption = {
  Recommended: 1,
  PriceLowToHigh: 2,
  PriceHighToLow: 3,
  LargestDiscount: 4,
} as const;

export type SortOption = typeof SortOption[keyof typeof SortOption];

/**
 * Request payload sent to the listings API
 */
export interface ListingsRequest {
  query: string;
  pageNumber: number;
  size: number;
  additionalPages?: number;
  sort: SortOption;
  facets?: Record<string, unknown>;
}
  
  /**
   * Raw product shape as returned by the API
   */
  export interface ApiProduct {
    id: string;
  productName: string;
  price: {
    priceIncTax: number;
    wasPrice?: number;
    isOnPromotion: boolean;
  };
  image?: {
    url: string;
    attributes?: {
      imageAltText?: string;
    };
  };
}

export interface ApiFacetValue {
    identifier: string;
    value: unknown;
    productCount: number;
  }
  
  /**
   * Facet group structure
   */
  export interface ApiFacetGroup {
    name: string;
    values: ApiFacetValue[];
  }
  
  /**
   * API response shape
   */
  export interface ListingsResponse {
    products: ApiProduct[];
    totalResults: number;
    facets?: Record<string, ApiFacetGroup>;
  }
  