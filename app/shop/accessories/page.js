'use server';

import { renderedTiles, stockSchema } from '../page.js';
import { unstable_noStore as noStore } from 'next/cache';
import NavBar from '../../_components/navBar';
import { stockSchema } from '../../_components/schemas.js';

export default async function Accessories() {
  let builtTiles = await renderedTiles(await fetchStockAccessories());
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/shop/accessories'} />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-light py-4 md:py-14'>Accessories</h1>
        <main className='grid grid-cols-2 max-w-[1280px] w-full justify-between sm:grid-cols-3 md:grid-cols-4'>
          {builtTiles}
        </main>
      </div>
    </div>
  );
}

const mongoose = require('mongoose');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Create DB model
let stockModel = mongoose.models.stock || mongoose.model('stock', stockSchema);

export const fetchStockAccessories = async function () {
  noStore();
  return await stockModel.find({ mainCategory: 'Accessories' });
};
