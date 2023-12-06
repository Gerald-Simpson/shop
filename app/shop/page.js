'use server';

import Link from 'next/link';
import styles from './styles.css';
import ItemTile from './_components/itemTile';
import { cache } from 'react';
import NavBar from '../_components/navBar';
import { unstable_noStore as noStore } from 'next/cache';

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
  variant: {
    type: [{ name: String, price: String, stock: Number }],
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

// Removed periodic revalidation as this revalidates every two minutes whether the website is in use or not, so results in more requests to the DB.
// Eventually change this revalidate every hour, with a tag to cause revalidation on successful user checkout
const fetchStock = async function () {
  noStore();
  return await stockModel.find({});
};

// map through each item of stock & if there is stock, render a item tile
// This could be changed to reduce server load by finding each item by Id from the DB instead
async function renderedTiles() {
  let stockData = await fetchStock();
  return stockData.map(async (data, index) => {
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
          variantName={data.variant[0].name}
        />
      );
    }
  });
}

export default async function Shop() {
  let builtTiles = renderedTiles();
  let stockData = await fetchStock();
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar path={'/shop'} stockData={stockData} />
      <div className='mainCont'>
        <h1 className='mainTitle'>Shop</h1>
        <main className='flex flex-wrap w-full justify-between'>
          {builtTiles}
        </main>
      </div>
    </div>
  );
}
