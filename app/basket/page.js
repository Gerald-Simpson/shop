import NavBar from '../_components/navBar';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import checkOut from './api/checkout_sessions.js';
import BasketTile from './_components/basketTile.js';
import BasketOverlay from './_components/basketOverlay.js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PreviewPage() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar path={'/basket'} />
      <main className='flex flex-col items-center justify-between'>
        <h1>Basket</h1>
        <form action={checkOut}>
          <BasketTile
            test={'test'}
            img={'/productImages/64e63ee03c9fbcb94a36d0ce/tile.jpg'}
          />
          <section>
            <button>Checkout</button>
          </section>
        </form>
      </main>
    </div>
  );
}
