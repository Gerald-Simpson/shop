'use client';
//64e63ee03c9fbcb94a36d0ce
import { useState } from 'react';
import { addToBasketAndClearCache } from '../../actions.js';

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
    <div className='flex relative w-auto mx-2 max-w-[550px] md:ml-4'>
      <div
        className='flex flex-col absolute pl-2 left-0 justify-center items-start w-24 h-full text-3xl font-extralight sm:hover:bg-cyan-100/50 cursor-pointer select-none'
        onClick={() => {
          prevImg();
        }}
      >
        &lt;
      </div>
      <img
        src={
          '/productImages/' + props.productId + '/img' + currentImage + '.jpg'
        }
        className='min-w-[250px]'
      ></img>
      <div
        className='flex flex-col absolute pr-2 right-0 justify-center items-end w-24 h-full text-3xl font-extralight sm:hover:bg-cyan-100/50 cursor-pointer select-none'
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
  let variantList = JSON.parse(props.variantList);
  let variantKey = {};
  variantList.forEach((variant) => {
    variantKey[variant.name] = { price: variant.price, stock: variant.stock };
  });
  const [currentVariant, changeVariant] = useState(variantList[0].name);
  const [currentQuantity, changeQuantity] = useState(1);
  let optionArr = [];
  variantList.forEach((variant) => {
    if (variant.stock > 0) {
      optionArr.push(
        <option value={variant.name} key={variant.name}>
          {variant.name}
        </option>
      );
    } else {
      optionArr.push(
        <option value={variant.name} key={variant.name}>
          {variant.name} - Out of Stock
        </option>
      );
    }
  });
  if (variantKey[currentVariant].stock > 0) {
    return (
      <div className='flex flex-col items-center px-10 sm:items-start sm:w-3/5 md:2/5'>
        <h1 className='text-2xl text-left font-normal py-4'>
          {props.productName}
        </h1>
        <p className='text-base text-left font-light'>
          {props.productDescription}
        </p>
        <select
          className='mt-8 py-2 px-4 bg-white border-r-8 border-transparent outline outline-1 outline-slate-300'
          name='variants'
          id='variants'
          value={currentVariant}
          onChange={(e) => changeVariant(e.target.value)}
        >
          {optionArr}
        </select>
        <QuantityControlProduct
          currentQuantity={currentQuantity}
          changeQuantity={changeQuantity}
        />
        <p className='text-xl text-left font-normal pt-6'>
          £{(variantKey[currentVariant].price * currentQuantity).toFixed(2)}
        </p>
        <button
          className='w-40 mt-4 py-2 bg-black text-white hover:bg-black/70'
          onClick={() =>
            addToBasketAndClearCache(
              props.cookieId,
              props.productId,
              currentVariant,
              currentQuantity
            ).then(changeQuantity(1))
          }
        >
          Add To Cart
        </button>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col items-center px-10 sm:items-start sm:w-3/5 md:2/5'>
        <h1 className='text-2xl text-left font-normal py-4'>
          {props.productName}
        </h1>
        <p className='text-base text-left font-light'>
          {props.productDescription}
        </p>
        <select
          className='mt-8 py-2 px-4 bg-white border-r-8 border-transparent outline outline-1 outline-slate-300'
          name='variants'
          id='variants'
          value={currentVariant}
          onChange={(e) => changeVariant(e.target.value)}
        >
          {optionArr}
        </select>
        <QuantityControlProduct
          currentQuantity={currentQuantity}
          changeQuantity={changeQuantity}
        />
        <p className='text-xl text-left font-normal pt-6'>
          £{(variantKey[currentVariant].price * currentQuantity).toFixed(2)}
        </p>
        <button className='w-40 mt-4 py-2 text-white bg-black/60 cursor-default'>
          Out of Stock
        </button>
      </div>
    );
  }
}

function QuantityControlProduct(props) {
  const decQuantity = () => {
    if (props.currentQuantity != 1) {
      props.changeQuantity(props.currentQuantity - 1);
    }
  };
  return (
    <div className='flex justify-evenly h-12 items-center w-36 border mt-8'>
      <div
        className='flex w-full h-full justify-center items-center hover:bg-slate-200 border-r text-2xl select-none cursor-pointer'
        onClick={() => {
          decQuantity();
        }}
      >
        &#x2212;
      </div>
      <div className='flex w-full h-full justify-center items-center'>
        <p className='text-md select-none'>{props.currentQuantity}</p>
      </div>
      <div
        className='flex w-full h-full justify-center items-center hover:bg-slate-200 border-l text-2xl select-none cursor-pointer'
        onClick={() => {
          props.changeQuantity(props.currentQuantity + 1);
        }}
      >
        &#x2B;
      </div>
    </div>
  );
}
