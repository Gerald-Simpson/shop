'use server';

import { cookies } from 'next/headers';
import '../styles.css';
import Link from 'next/link';

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
