import Stripe from 'stripe'

const apiKey = process.env.STRIPE_SK_TEST ?? ''

export const stripe = new Stripe(apiKey, {
  apiVersion: '2022-11-15',
})
