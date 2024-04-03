'use server';

import ItemTile from './_components/itemTile';
import { cache } from 'react';
import NavBar from '../_components/navBar';
import { unstable_noStore as noStore } from 'next/cache';
import { stockSchema } from '../_components/schemas.js';
import { fetchStock } from '../actions.js';

export default async function Shop() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/shop'} />
      <main className='flex flex-col w-full'>
        <div className='flex flex-col items-center'>
          <h1 className='text-3xl font-light py-4 md:py-14'>Shop All</h1>
          <div className='grid grid-cols-2 max-w-[1280px] w-full justify-between sm:grid-cols-3 md:grid-cols-4'>
            {await renderedTiles(await fetchStock())}
          </div>
        </div>
      </main>
    </div>
  );
}

// map through each item of stock & if there is stock, render a item tile
// This could be changed to reduce server load by finding each item by Id from the DB instead
export async function renderedTiles(stockData) {
  const priceOptions = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return stockData.map(async (data) => {
    let stockCount = 0;
    let minPrice = '';
    data.variant.forEach((vari) => {
      stockCount += vari.stock;
      if (minPrice === '') {
        minPrice = vari.price;
      } else if (parseFloat(minPrice) > parseFloat(vari.price)) {
        minPrice = vari.price;
      }
    });
    minPrice = parseFloat(minPrice).toLocaleString('en-US', priceOptions);
    if (stockCount > 0) {
      return (
        <ItemTile
          img1={'/productImages/' + data['_id'] + '/tile.jpg'}
          img2={'/productImages/' + data['_id'] + '/tileHover.jpg'}
          price={'£' + minPrice}
          name={data['name']}
          itemDbId={data['_id']}
          description={data.description}
          variantName={data.variant[0].name}
        />
      );
    } else {
      return (
        <ItemTile
          img1={'/productImages/' + data['_id'] + '/tile.jpg'}
          img2={'/productImages/' + data['_id'] + '/tileHover.jpg'}
          price={'£' + minPrice}
          name={data['name']}
          itemDbId={data['_id']}
          description={data.description}
          variantName={data.variant[0].name}
          outStock={true}
        />
      );
    }
  });
}
