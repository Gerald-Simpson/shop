'use client';
//64e63ee03c9fbcb94a36d0ce
import { useState } from 'react';

export function ProductImage(props) {
  const [currentImage, changeImage] = useState(1);
  const nextImg = () => {
    if (props.pictureCount == currentImage) {
      changeImage(1);
    } else {
      changeImage(currentImage + 1);
    }
  };
  const prevImg = () => {
    if (currentImage == 1) {
      changeImage(props.pictureCount);
    } else {
      changeImage(currentImage - 1);
    }
  };
  return (
    <div className='flex w-1/2'>
      <div
        className='flex flex-col relative left-12 justify-center items-center w-12 h-full text-3xl font-extralight hover:bg-cyan-100/50 cursor-pointer select-none'
        onClick={() => {
          prevImg();
        }}
      >
        &lt;
      </div>
      <img
        width='500'
        height='500'
        src={
          '/productImages/' + props.productId + '/img' + currentImage + '.jpg'
        }
      ></img>
      <div
        className='flex flex-col relative right-12 justify-center items-center w-12 h-full text-3xl font-extralight hover:bg-cyan-100/50 cursor-pointer select-none'
        onClick={() => {
          nextImg();
        }}
      >
        &gt;
      </div>
    </div>
  );
}

export function ProductInfo(props) {
  return (
    <div className='flex flex-col w-2/5 px-10'>
      <h1 className='text-2xl text-left font-light py-4'>
        World peace and some other garbage that is longer
      </h1>
      <p className='text-base text-left font-light'>Price £</p>
      <p className='text-base text-left font-light'>
        asdfl sdfkljsadf asdfkljkljf asdfhasdsf asdfkldsfju woh werlihj.
      </p>
    </div>
  );
}
