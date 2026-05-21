// Stripe Product Configuration
export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  pricePerUnit: number;
  currencySymbol: string;
  mode: 'payment' | 'subscription';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_UYlOHkZF3NeYAn',
    priceId: 'price_1TZds5QHfPWHg7KdmhqEZ8pm',
    name: 'JurisOS Starter',
    description: 'AI contract review for small legal teams. 50 reviews/month, 3 playbooks, email support.',
    pricePerUnit: 299.00,
    currencySymbol: '$',
    mode: 'subscription',
  },
];