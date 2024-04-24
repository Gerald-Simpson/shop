import { emptyBasket } from '../actions';
import { reduceStock } from '../actions.tsx';
import { NextRequest } from 'next/server';
//stripe trigger payment_intent.succeeded
//stripe listen --forward-to localhost:3000/webhook

//const Stripe = require('stripe');
//const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  switch (body.type) {
    case 'checkout.session.completed':
      let cookieId = await body.data.object.client_reference_id;
      reduceStock(cookieId).then(() => emptyBasket(cookieId));

      break;

    // ... handle other event types
    default:
  }
  return new Response(JSON.stringify({ received: true }));
}
