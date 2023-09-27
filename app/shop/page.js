import Link from 'next/link';
import styles from './styles.css';
import ItemTile from './_components/itemTile';
import Image from 'next/image';
import testY from '../../public/productImages/item1A.jpg';

const mongoose = require('mongoose');
require('dotenv').config();

async function fetchStock() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const stockSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
    },
    categories: {
      type: Object,
    },
  });

  let stockModel =
    mongoose.models.stock || mongoose.model('stock', stockSchema);
  return await stockModel.find({});
}

async function renderedTiles() {
  let stockData = await fetchStock();
  return stockData.map(async (data, index) => {
    return (
      <ItemTile
        img1={'/productImages/' + data['_id'] + '/tile.jpg'}
        img2={'/productImages/' + data['_id'] + '/tileHover.jpg'}
        price='£12.99'
        description='this is a test description'
      />
    );
  });
}

export default async function Shop() {
  let stockData = await fetchStock();
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
