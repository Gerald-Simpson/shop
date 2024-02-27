'use server';

import { renderedTiles } from '../page.js';
import { unstable_noStore as noStore } from 'next/cache';
import NavBar from '../../_components/navBar';
import stockSchemaData from '../../_components/schemas.js';

export default async function Espresso() {
  let builtTiles = await renderedTiles(await fetchStockEspresso());
  return (
    <div className='h-screen flex flex-col items-center'>
      {' '}
      <NavBar activePath={'/shop/espresso'} />{' '}
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-light py-4 md:py-14'>Espresso</h1>
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
let stockModel =
  mongoose.models.stock ||
  mongoose.model('stock', new mongoose.Schema(stockSchemaData));

export const fetchStockEspresso = async function () {
  noStore();
  return await stockModel.find({ mainCategory: 'Espresso' });
};
