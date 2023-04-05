/* eslint-disable camelcase */
import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function createCheckoutSession(
  req: NextApiRequest,
  res: NextApiResponse<{ url?: string | null; error?: string }>,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
  }

  const cartDetails = JSON.parse(req.body.cartDetails as string)
  const lineItems = cartDetails.map((product: any) => ({
    price: product.price_id,
    quantity: 1,
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
