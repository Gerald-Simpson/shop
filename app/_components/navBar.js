'use server';

import Link from 'next/link';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import NavBasketButton from './navBasketButton.js';

// Currently does not cache but will look at caching & re-validating when necessary later
async function fetchBasket() {
  let res = await fetch(process.env.HOST_NAME + '/api/fetch-basket', {
    method: 'GET',
    cache: 'no-store',
    next: { tags: ['basketTag'] },
    headers: {
      cookieId: cookies().get('id')['value'],
    },
  });
  const data = await res.json();
  return data;
}

async function basketCount(data) {
  if (data.length === 0) return ' 0';
  let basketItemCount = 0;
  await data.basket.forEach((entry) => {
    basketItemCount += entry['count'];
  });
  return basketItemCount;
}

async function fetchBasketCount() {
  let data = await fetchBasket();
  return basketCount(data);
}

export default async function NavBar(props) {
  return (
    <div className='w-full h-20 flex items-center justify-between font-mono text-sm bg-white px-80'>
      <Link href='/' className='text-4xl'>
        Logo
      </Link>
      <div className='flex w-2/4 justify-evenly'>
        <NavLink title={'HOME'} href={'/'} activePath={props.activePath} />
        <NavLink
          title={'PORTFOLIO'}
          href={'/portfolio'}
          activePath={props.activePath}
        />
        <NavLink title={'SHOP'} href={'/shop'} activePath={props.activePath} />
        <NavLink
          title={'COMMISSIONS'}
          href={'/commissions'}
          activePath={props.activePath}
        />
        <NavBasketButton basketCount={fetchBasketCount()} />
      </div>
    </div>
  );
}

/*
        <Suspense fallback={<NavElements basketCount='0' path={props.path} />}>
          <NavElements
            basketCount={await fetchBasketCount()}
            stockData={props.stockData}
            basketData={await fetchBasket()}
            path={props.path}
          />
        </Suspense>
    
    */

async function NavLink(props) {
  if (props.href === props.activePath) {
    return (
      <Link
        id={'nav' + props.title}
        href={props.href}
        className={'text-textAccent'}
      >
        {props.title}
      </Link>
    );
  } else {
    return (
      <Link
        id={'nav' + props.title}
        href={props.href}
        className={'hover:text-textAccent'}
      >
        {props.title}
      </Link>
    );
  }
}
