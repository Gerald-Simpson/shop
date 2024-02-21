import NavBar from '../../_components/navBar.js';
import {
  ProductImage,
  ProductInfo,
} from '../_components/productIdComponents.js';
import { cookies } from 'next/headers';

//{params.productId}
//64e63ee03c9fbcb94a36d0ce

export default async function Page({ params }) {
  let cookieId = '';
  let cookieList = cookies();
  if (cookieList.has('id')) {
    cookieId = cookies().get('id').value;
  }
  let productInfo = await fetchStockItem(params.productId);
  if (productInfo.length === 0) {
    return (
      <div className='flex justify-center items-center w-full h-screen mainTitle bg-black'>
        <h1 className='text-white'> 404 - Product not found!</h1>
      </div>
    );
  } else {
    return (
      <div className='h-screen flex flex-col items-center'>
        <NavBar activePath={'/shop'} />
        <div className='flex max-w-[1280px] pt-5'>
          <main className='flex w-full'>
            <div className='flex flex-col items-center w-full pt-5 sm:flex-row sm:justify-center'>
              <ProductImage
                productId={params.productId}
                pictureCount={productInfo.pictureCount}
              />
              <ProductInfo
                productName={productInfo.name}
                productDescription={productInfo.description}
                cookieId={cookieId}
                variantList={JSON.stringify(productInfo.variant)}
                productId={params.productId}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mongoose = require('mongoose');

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

async function fetchStockItem(productId) {
  try {
    let response = await stockModel.find({ _id: productId });
    return response[0];
  } catch (err) {
    return [];
  }
}
