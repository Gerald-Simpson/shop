'use client';
//64e63ee03c9fbcb94a36d0ce
import { useState } from 'react';

export function ProductImage(props) {
  const [currentImage, changeImage] = useState('img1');
  const testEr = () => changeImage('img2');
  return (
    <div className='flex w-3/5 bg-pink-100'>
      <img
        width='600'
        height='600'
        onClick={() => {
          testEr();
        }}
        src={'/productImages/' + props.productId + '/' + currentImage + '.jpg'}
      ></img>
    </div>
  );
}

export function ProductInfo(props) {
  return <div className='flex w-2/5 bg-yellow-100'>test</div>;
}
