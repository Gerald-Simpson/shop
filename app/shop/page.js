import Link from 'next/link';
import styles from './styles.css';
import ItemTile from './_components/itemTile';
import { cache } from 'react';
import { createCookie } from './actions';

const mongoose = require('mongoose');

//Connected to DB in layout.js

// Set DB schema
const stockSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  stock: {
    type: Number,
  },
  categories: {
    type: Object,
  },
});

// Create DB model
let stockModel = mongoose.models.stock || mongoose.model('stock', stockSchema);

/*
//stock data from db is cached & re-validated every 120 seconds
export const revalidate = 120;
export const fetchStock = cache(async function () {
  return await stockModel.find({});
});
*/
// Removed periodic revalidation as this revalidates every two minutes whether the website is in use or not, so results in more requests to the DB.
export const fetchStock = async function () {
  return await stockModel.find({});
};

// map through each item of stock & if there is stock, render a item tile
async function renderedTiles() {
  let stockData = await fetchStock();
  return stockData.map(async (data, index) => {
    if (data['stock'] > 0) {
      return (
        <ItemTile
          img1={'/productImages/' + data['_id'] + '/tile.jpg'}
          img2={'/productImages/' + data['_id'] + '/tileHover.jpg'}
          price={'£' + data['price']}
          name={data['name']}
        />
      );
    }
  });
}

export default async function Shop() {
  let builtTiles = await renderedTiles();
  return (
    <div className='mainCont'>
      <h1 className='mainTitle'>Shop</h1>
      <main className='flex flex-wrap w-full justify-between'>
        {builtTiles}
      </main>
    </div>
  );
}
