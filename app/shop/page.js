'use server';

import Link from 'next/link';
import styles from './styles.css';
import ItemTile from './_components/itemTile';
import { cache } from 'react';
import NavBar from '../_components/navBar';
import { unstable_noStore as noStore } from 'next/cache';

export default async function Shop() {
  let builtTiles = await renderedTiles();
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/shop'} />
      <div className='mainCont'>
        <h1 className='mainTitle'>Shop</h1>
        <main className='flex flex-wrap w-full justify-between'>
          {' '}
          {builtTiles}
        </main>
      </div>
    </div>
  );
}

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

const mongoose = require('mongoose');

let stockModel = mongoose.models.stock;

export const fetchStock = async function () {
  noStore();
  return await stockModel.find({});
};
