'use server';

import { cookies } from 'next/headers';

async function fetchBasketCount() {
  let res = await fetch('http://localhost:3000/api/fetch-basket', {
    method: 'GET',
    headers: {
      cookieId: cookies().get('id')['value'],
    },
  });
  const data = await res.json();
  let basketItemCount = 0;
  await data['basket'].forEach((entry) => {
    basketItemCount += entry['count'];
  });
  return basketItemCount;
}

export default async function Home() {
  let test = 'other test';
  let otherTest = fetchBasketCount();
  return (
    <div>
      <p>test</p>
      <p>{test}</p>
      <p>{otherTest}</p>
    </div>
  );
}
