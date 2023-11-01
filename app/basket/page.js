'use client';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import checkOut from './api/checkout_sessions.js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PreviewPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='h-screen'>
        <p>Basket</p>
      </div>
      <form action={checkOut}>
        <section>
          <button>Checkout</button>
        </section>
      </form>
    </main>
  );
}
