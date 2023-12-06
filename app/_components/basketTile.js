'use client';

// Will need to save lower resolution version of images as Next Image won't work if images aren't loaded at build / page load
export default function BasketTile(props) {
  return (
    <div className='flex flex-row justify-between w-full p-5 items-center border-b'>
      <img width='90' height='90' src={props.img} />
      <div className='flex justify-between w-full h-full px-3'>
        <div className='flex flex-col h-full justify-start py-2'>
          <p className='text-xs font-bold underline underline-offset-1'>
            {props.name}
          </p>
          <p className='pt-1 text-xs font-bold'>{props.variant}</p>
          <p className='pt-1 text-xs'>{props.quantity}</p>
        </div>
        <div className='flex flex-col h-full w-auto justify-between items-end py-2'>
          <button className='text-xs hover:text-red-700'>Remove</button>
          <p>£{props.price}</p>
        </div>
      </div>
    </div>
  );
}
