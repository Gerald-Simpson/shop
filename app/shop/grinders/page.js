'use server';

import { renderedTiles, stockSchema } from '../page.js';
import { unstable_noStore as noStore } from 'next/cache';
import NavBar from '../../_components/navBar';

export default async function Grinders() {
  let builtTiles = await renderedTiles(await fetchStockGrinders());
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/shop/grinders'} />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-light py-4 md:py-14'>Grinders</h1>
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

export const fetchStockGrinders = async function () {
  noStore();
  return await stockModel.find({ mainCategory: 'Grinders' });
};
