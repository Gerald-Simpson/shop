import Link from 'next/link';
import styles from './styles.css';
import ItemTile from './_components/itemTile';
import { cache } from 'react';

const mongoose = require('mongoose');
require('dotenv').config();

// Connect to stock DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

//stock data from db is cached & re-validated every 60 seconds
export const revalidate = 60;
export const fetchStock = cache(async function () {
  return await stockModel.find({});
});

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
