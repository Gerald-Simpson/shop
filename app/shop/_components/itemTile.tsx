'use server';

import { cookies } from 'next/headers';
import '../styles.css';
import Link from 'next/link';
import { stockListing } from '@/app/_components/generalControllers';

// map through each item of stock & if there is stock, render a item tile
// This could be changed to reduce server load by finding each item by Id from the DB instead
export async function renderedTiles(stockData: stockListing[]) {
  const priceOptions = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return stockData.map(async (stock) => {
    let minPrice = stock.minPrice.toLocaleString('en-US', priceOptions);
    if (stock.inStock) {
      return (
        <ItemTile
          img1={'/productImages/' + stock.id + '/tile.jpg'}
          img2={'/productImages/' + stock.id + '/tileHover.jpg'}
          price={'£' + minPrice}
          name={stock.name}
          itemDbId={stock.id}
          description={stock.description.split(';')}
        />
      );
    } else {
      return (
        <ItemTile
          img1={'/productImages/' + stock.id + '/tile.jpg'}
          img2={'/productImages/' + stock.id + '/tileHover.jpg'}
          price={'£' + minPrice}
          name={stock.name}
          itemDbId={stock.id}
          description={stock.description.split(';')}
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
  itemDbId: number;
  description: string[];
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
        className='flex flex-col flex-wrap items-center min-w-[10%] mx-[0.7rem] mb-[2.5rem]'
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
