import { emptyBasket } from '../shop/_components/modifyBasket.js';
import { reduceStock } from '../actions.js';
//stripe trigger payment_intent.succeeded
//stripe listen --forward-to localhost:3000/webhook

//const Stripe = require('stripe');
//const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();
  switch (body.type) {
    case 'checkout.session.completed':
      let cookieId = await body.data.object.client_reference_id;
      reduceStock(cookieId).then(() => emptyBasket(cookieId));

      break;

    // ... handle other event types
    default:
    //console.log(`Unhandled event type ${body.type}`);
  }
  return new Response(JSON.stringify({ received: true }));
}
