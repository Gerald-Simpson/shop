'use server';

import Image from 'next/image';

export default async function BasketTile(props) {
  return (
    <div className='flex flex-row justify-between w-full items-center bg-orange-500'>
      <Image width='80' height='80' src={props.img} />
      <div>
        <div>
          <p>item name</p>
          <p>price</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>quantity</p>
          <p>remove button</p>
        </div>
      </div>
    </div>
  );
}
