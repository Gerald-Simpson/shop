'use server';

import { cookies } from 'next/headers';

export async function createCookie() {
  cookies().set('basket', 'otherTest');
  console.log('cookie created');
  return 'othertest';
}
//Instead of updating the cookie with what is in the basket, save an id to the cookie on first website load & then save the basket contents in a db referencing the cookie id.
