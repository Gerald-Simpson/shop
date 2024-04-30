'use server';

import { cookies } from 'next/headers';
import '../styles.css';
import Link from 'next/link';

interface stockDbItem {
  name: string;
  variant: [
    {
      name: string;
      price: string;
      stock: number;
      _id: string;
    },
  ];
  price: string;
  description: [string];
  quantity: number;
  itemDbId: string;
  _id: string;
}

// map through each item of stock & if there is stock, render a item tile
// This could be changed to reduce server load by finding each item by Id from the DB instead
export async function renderedTiles(stockData: stockDbItem[]) {
  const priceOptions = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
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
    minPrice = parseFloat(minPrice).toLocaleString('en-US', priceOptions);
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

interface tileProps {
  img1: string;
  img2: string;
  price: string;
  name: string;
  itemDbId: string;
  description: [string];
  variantName: string;
  outStock?: boolean;
}

export default async function ItemTile(props: tileProps) {
  let cookieId = '';
  let cookieList = cookies();
  if (cookieList.has('id')) {
    cookieId = cookies().get('id')!.value;
  }
  if (props.outStock === undefined || false) {
    return (
      <Link
        href={'/shop/' + props.itemDbId}
        className='flex flex-col flex-wrap items-center min-w-[10%] mx-[0.25rem] mx-[0.25rem]'
      >
        <div className='tileImg'>
          <img
            className='tileImgOne z-0'
            src={props.img1}
            alt={'Picture 1 of ' + props.name}
          />
          <img
            className='tileImgTwo z-0'
            src={props.img2}
            alt={'Picture 2 of ' + props.name}
          />
        </div>
        <div className='flex flex-col items-center text-center mx-[1rem] my-[0.5rem]'>
          <h3 className='text-base'>{props.name}</h3>
          <p className='text-sm'>{props.price}</p>
        </div>
      </Link>
    );
  } else if (props.outStock === true) {
    return (
      <div className=' opacity-50 flex flex-col flex-wrap items-center mx-[0.25rem] mx-[0.25rem]'>
        <div className='tileImg'>
          <img
            className='tileImgOne z-0'
            src={props.img1}
            alt={'Picture 1 of ' + props.name}
          />
          <img
            className='tileImgTwo z-0'
            src={props.img2}
            alt={'Picture 2 of ' + props.name}
          />
        </div>
        <div className='flex flex-col items-center text-center mx-[1rem] my-[0.5rem]'>
          <h3 className='shopLabel'>{props.name}</h3>
          <p className='shopPrice'>{props.price}</p>
        </div>
        <p>Out of Stock</p>
      </div>
    );
  }
}
