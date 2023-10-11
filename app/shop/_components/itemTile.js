'use server';

import Image from 'next/image';
import AddToBasketButton from './AddToBasketButton.js';
import { cookies } from 'next/headers';

export default async function ItemTile(props) {
  return (
    <div className='flex flex-col flex-wrap items-center max-w-[23%] min-w-[10%] px-[0.25rem] py-[1rem] mx-[0.25rem] my-[1rem]'>
      <div className='tileImg' sizes='22%'>
        <Image
          className='tileImgOne'
          width='280'
          height='280'
          src={props.img1}
        />
        <Image
          className='tileImgTwo'
          width='280'
          height='280'
          src={props.img2}
        />
      </div>
      <div className='flex flex-col items-center text-center mx-[1rem] my-[0.5rem]'>
        <h3 className='shopLabel'>{props.name}</h3>
        <p className='shopPrice'>{props.price}</p>
      </div>
      <AddToBasketButton
        cookieId={cookies().get('id')['value']}
        itemDbId={String(props.itemDbId)}
      />
    </div>
  );
}
