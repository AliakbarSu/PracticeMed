import Stripe from 'stripe'

export interface CustomerMetadata {
  auth0_id: string
}

export interface StripeCustomer extends Omit<Stripe.Customer, 'metadata'> {
  metadata: CustomerMetadata
}
