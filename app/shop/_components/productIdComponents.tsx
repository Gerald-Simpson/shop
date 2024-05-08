'use client';
//64e63ee03c9fbcb94a36d0ce
import { useState } from 'react';
import { GlobalContext } from '../../../stateProvider.tsx';
import { useContext } from 'react';
import { addToBasket } from '../../actions.tsx';
import { inter, space } from '../../fonts.ts';

export function ProductImage(props: {
  productId: string;
  pictureCount: number;
}) {
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
    <div
      className={
        'flex relative w-auto md:mx-2 max-w-[650px] md:ml-4 min-w-[100px] min-h-[100px] ' +
        inter.className
      }
    >
      <div
        className='flex flex-col absolute left-0 pl-2 justify-center items-start w-24 h-full text-3xl font-normal sm:hover:bg-hoverColor/30 cursor-pointer select-none '
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
        className='min-w-[100px] object-contain'
      ></img>
      <div
        className='flex flex-col absolute right-0 pr-2 justify-center items-end w-24 h-full text-3xl font-normal sm:hover:bg-hoverColor/30 cursor-pointer select-none'
        onClick={() => {
          nextImg();
        }}
      >
        &gt;
      </div>
    </div>
  );
}

interface stockVariantItem {
  name: string;
  price: string;
  stock: number;
  _id: string;
}

interface variantKey {
  [key: string]: {
    price: string;
    stock: number;
  };
}

export function ProductInfo(props: {
  productName: string;
  productDescription: string[];
  cookieId: string;
  variantList: string;
  productId: string;
}) {
  let variantList = JSON.parse(props.variantList);
  let variantKey: variantKey = {};
  const { basketChange }: any = useContext(GlobalContext);
  variantList.forEach((variant: stockVariantItem) => {
    variantKey[variant.name] = { price: variant.price, stock: variant.stock };
  });
  const [currentVariant, changeVariant] = useState(variantList[0].name);
  const [currentQuantity, changeQuantity] = useState(1);
  let optionArr: JSX.Element[] = [];
  const priceOptions = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  let productDescriptionString = props.productDescription;
  let productDescription: JSX.Element[] = productDescriptionString.map(
    (description) => {
      return (
        <div>
          <p className='text-base text-left font-light'>{description}</p>
          <br />
        </div>
      );
    },
  );
  variantList.forEach((variant: stockVariantItem) => {
    if (variant.stock > 0) {
      optionArr.push(
        <option value={variant.name} key={variant.name}>
          {variant.name}
        </option>,
      );
    } else {
      optionArr.push(
        <option value={variant.name} key={variant.name}>
          {variant.name} - Out of Stock
        </option>,
      );
    }
  });
  if (Object.keys(variantKey).length === 1) {
    return (
      <div className='flex flex-col items-center mx-10 sm:items-start sm:w-3/5 md:2/5'>
        <h1 className='text-2xl text-left font-normal py-4'>
          {props.productName}
        </h1>
        <div>{productDescription}</div>
        <QuantityControlProduct
          currentQuantity={currentQuantity}
          changeQuantity={changeQuantity}
        />
        <p className='text-xl text-left font-normal pt-6'>
          £
          {(
            parseFloat(variantKey.currentVariant.price) * currentQuantity
          ).toLocaleString('en-US', priceOptions)}
        </p>
        <button
          className='w-40 mt-4 py-2 bg-black text-orange-900/90 hover:bg-orange-900 mb-20'
          onClick={() => {
            addToBasket(
              props.cookieId,
              props.productId,
              currentVariant,
              currentQuantity,
            )
              .then(() => changeQuantity(1))
              .then(() => basketChange(true));
          }}
        >
          Add To Cart
        </button>
      </div>
    );
  }
  if (variantKey[currentVariant].stock > 0) {
    return (
      <div className='flex flex-col items-center mx-10 sm:items-start sm:w-3/5 md:2/5'>
        <h1 className='text-2xl text-left font-normal py-4'>
          {props.productName}
        </h1>
        <div>{productDescription}</div>
        <select
          className='mt-8 py-2 pl-2 w-full h-auto min-w-[50px] bg-white border-r-8 border-transparent outline outline-1 outline-slate-300'
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
          £
          {(
            parseFloat(variantKey[currentVariant].price) * currentQuantity
          ).toLocaleString('en-US', priceOptions)}
        </p>
        <button
          className='w-40 mt-4 py-2 bg-orange-900/90 text-white hover:bg-orange-900 mb-20'
          onClick={() =>
            addToBasket(
              props.cookieId,
              props.productId,
              currentVariant,
              currentQuantity,
            )
              .then(() => changeQuantity(1))
              .then(() => basketChange(true))
          }
        >
          Add To Cart
        </button>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col items-center mx-10 sm:items-start sm:w-3/5 md:2/5'>
        <h1 className='text-2xl text-left font-normal py-4'>
          {props.productName}
        </h1>
        <div>{productDescription}</div>
        <select
          className='mt-8 py-2 pl-2 w-full min-w-[50px] h-auto bg-white border-r-8 border-transparent outline outline-1 outline-slate-300'
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
          £
          {(
            parseFloat(variantKey[currentVariant].price) * currentQuantity
          ).toLocaleString('en-US', priceOptions)}
        </p>
        <button className='w-40 mt-4 py-2 text-white bg-orange-900/50 cursor-default mb-20'>
          Out of Stock
        </button>
      </div>
    );
  }
}

function QuantityControlProduct(props: {
  currentQuantity: number;
  changeQuantity: Function;
}) {
  const decQuantity = () => {
    if (props.currentQuantity != 1) {
      props.changeQuantity(props.currentQuantity - 1);
    }
  };
  return (
    <div className='flex justify-evenly h-12 items-center w-36 border mt-8'>
      <div
        className='flex w-full h-full justify-center items-center hover:bg-hoverColor/30 border-r text-2xl select-none cursor-pointer'
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
        className='flex w-full h-full justify-center items-center hover:bg-hoverColor/30 border-l text-2xl select-none cursor-pointer'
        onClick={() => {
          props.changeQuantity(props.currentQuantity + 1);
        }}
      >
        &#x2B;
      </div>
    </div>
  );
}
