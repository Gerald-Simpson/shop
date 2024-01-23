'use server';

import AddToBasketButton from './AddToBasketButton.js';
import { cookies } from 'next/headers';

export default async function ItemTile(props) {
  let cookieId = '';
  let cookieList = cookies();
  if (cookieList.has('id')) {
    cookieId = cookies().get('id').value;
  }
  if (props.outStock === undefined || false) {
    return (
      <div className='flex flex-col flex-wrap items-center max-w-[23%] min-w-[10%] px-[0.25rem] py-[1rem] mx-[0.25rem] my-[1rem]'>
        <div className='tileImg' sizes='22%'>
          <img
            className='tileImgOne z-0'
            width='280'
            height='280'
            src={props.img1}
            alt={'Picture 1 of ' + props.description}
          />
          <img
            className='tileImgTwo z-0'
            width='280'
            height='280'
            src={props.img2}
            alt={'Picture 2 of ' + props.description}
          />
        </div>
        <div className='flex flex-col items-center text-center mx-[1rem] my-[0.5rem]'>
          <h3 className='text-base'>{props.name}</h3>
          <p className='text-sm'>{props.price}</p>
        </div>
        <AddToBasketButton
          cookieId={cookieId}
          itemDbId={String(props.itemDbId)}
          variantName={props.variantName}
        />
      </div>
    );
  } else if (props.outStock === true) {
    return (
      <div className=' opacity-50 flex flex-col flex-wrap items-center max-w-[23%] min-w-[10%] px-[0.25rem] py-[1rem] mx-[0.25rem] my-[1rem]'>
        <div className='tileImg' sizes='22%'>
          <img
            className='tileImgOne z-0'
            width='280'
            height='280'
            src={props.img1}
            alt={'Picture 1 of ' + props.description}
          />
          <img
            className='tileImgTwo z-0'
            width='280'
            height='280'
            src={props.img2}
            alt={'Picture 2 of ' + props.description}
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
