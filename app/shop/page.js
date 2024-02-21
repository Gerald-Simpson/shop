'use server';

import ItemTile from './_components/itemTile';
import { cache } from 'react';
import NavBar from '../_components/navBar';
import { unstable_noStore as noStore } from 'next/cache';

export default async function Shop() {
  let builtTiles = await renderedTiles(await fetchStock());
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/shop'} />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-light py-4 md:py-14'>Shop</h1>
        <main className='grid grid-cols-2 max-w-[1280px] w-full justify-between sm:grid-cols-3 md:grid-cols-4'>
          {builtTiles}
        </main>
      </div>
    </div>
  );
}

// map through each item of stock & if there is stock, render a item tile
// This could be changed to reduce server load by finding each item by Id from the DB instead
export async function renderedTiles(stockData) {
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

const mongoose = require('mongoose');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Set DB schema
const stockSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  variant: {
    type: [{ name: String, price: String, stock: Number }],
  },
  price: {
    type: String,
  },
  mainCategory: {
    type: String,
  },
  pictureCount: {
    type: Number,
  },
});

// Create DB model
let stockModel = mongoose.models.stock || mongoose.model('stock', stockSchema);

export const fetchStock = async function () {
  noStore();
  return await stockModel.find({});
};
