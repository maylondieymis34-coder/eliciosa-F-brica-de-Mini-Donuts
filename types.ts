
export interface DonutOrder {
  unfilledQuantity: number;
  filledQuantity: number;
  fillings: string[];
  toppings: string[];
  customColor: string;
}

export interface SuggestionResponse {
  fillings: string[];
  toppings: string[];
  color: string;
  reason: string;
}

export interface PriceConfig {
  unfilled: number;
  filled: number;
}
