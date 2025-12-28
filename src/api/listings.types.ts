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
 * Facet filter value types
 */
export interface PriceRangeFacetValue {
  identifier: string;
  value: {
    gte: number;
    lte: number;
  };
}

export interface StringFacetValue {
  identifier: string;
  value: string;
}

export type FacetFilterValue = PriceRangeFacetValue | StringFacetValue;

/**
 * Request payload sent to the listings API
 */
export interface ListingsRequest {
  query: string;
  pageNumber: number;
  size: number;
  additionalPages?: number;
  sort: SortOption;
  facets?: Record<string, FacetFilterValue[]>;
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
  displayValue: string;
  productCount: number;
  priority: number;
}

/**
 * Facet group structure from API
 */
export interface ApiFacetGroup {
  identifier: string;
  displayName: string;
  priority: number;
  options: ApiFacetValue[];
  facetType: number;
}

/**
 * API response shape
 */
export interface ListingsResponse {
  products: ApiProduct[];
  totalResults: number;
  facets?: ApiFacetGroup[];
}
  