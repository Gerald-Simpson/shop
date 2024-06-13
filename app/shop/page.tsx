'use server';

import { renderedTiles } from './_components/itemTile.tsx';
import NavBar from '../_components/navBar';
import { fetchStock } from '../actions.tsx';

export default async function Shop() {
  let res = await fetch('http://localhost:1337/api/stocks', {
    headers: {
      Authorization: 'Bearer ' + process.env.STRAPI_TOKEN,
    },
    cache: 'no-store',
  });

  const data = await res.json();
  console.log(data);
  console.log(data.data);
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/shop'} />
      <p>test</p>
      <p>
        {data.data[0].attributes.name +
          ' - ' +
          data.data[0].attributes.minPrice}
      </p>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-light py-4 md:py-14'>Shop All</h1>
        <main className='grid grid-cols-2 max-w-[1280px] w-full justify-between sm:grid-cols-3 md:grid-cols-4'>
          {await renderedTiles(await fetchStock())}
        </main>
      </div>
    </div>
  );
}
