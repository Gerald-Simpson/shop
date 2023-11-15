'use server';

import styles from './NavBar.module.css';
import Link from 'next/link';
import NavElements from './navElements.js';
import { cookies } from 'next/headers';

async function fetchBasketCount() {
  if (!cookies().has('id')) {
    return '';
  }
  //return '';
  let res = await fetch(process.env.HOST_NAME + '/api/fetch-basket', {
    method: 'GET',
    cache: 'no-store',
    next: { tags: ['basketTag'] },
    headers: {
      cookieId: cookies().get('id')['value'],
    },
  });
  const data = await res.json();
  if (data.length === 0) return ' 0';
  let basketItemCount = 0;
  await data['basket'].forEach((entry) => {
    basketItemCount += entry['count'];
  });
  return ' ' + basketItemCount;
}

export default async function NavBar(props) {
  return (
    <div className='w-full h-20 flex items-center justify-between font-mono text-sm bg-white px-80'>
      <Link href='/' className='text-4xl'>
        Logo
      </Link>
      <div className='flex w-2/4 justify-evenly'>
        <NavElements basketCount={await fetchBasketCount()} path={props.path} />
      </div>
    </div>
  );
}
