/* eslint-disable camelcase */
import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CartEntry, Product } from 'use-shopping-cart/core'

type CartProduct = CartEntry & Product

export default async function createCheckoutSession(
  req: NextApiRequest,
  res: NextApiResponse<{ url?: string | null; error?: string }>,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
  }

  const cart = JSON.parse(req.body.cart as string)
  const lineItems = cart.map((product: CartProduct) => ({
    price: product.price_id,
    quantity: product.quantity,
  }))

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      currency: 'usd',
      line_items: lineItems,
      success_url: `${req.headers
        .origin!}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: req.headers.origin!,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.log('[createCheckoutSession] Something went wrong', err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
