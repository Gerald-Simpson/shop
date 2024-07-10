'use server';

import NavBar from '../../_components/navBar.tsx';
import {
  ProductImage,
  ProductInfo,
} from '../_components/productIdComponents.tsx';
import { cookies } from 'next/headers';
import { fetchStockWithId } from '../../serverActions/viewActions.tsx';

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  let cookieId = '';
  let cookieList = cookies();
  if (cookieList.has('id')) {
    cookieId = cookies().get('id')!.value;
  }
  let productInfo = await fetchStockWithId(params.productId);
  if (productInfo.length === 0) {
    return (
      <div className='flex justify-center items-center w-full h-screen mainTitle bg-black'>
        <h1 className='text-white'> 404 - Product not found!</h1>
      </div>
    );
  } else {
    return (
      <div className='h-screen w-screen flex flex-col items-center min-w-[100px]'>
        <NavBar activePath={'/shop'} />
        <div className='flex max-w-[1200px] pt-5'>
          <main className='flex w-full'>
            <div className='flex flex-col w-full pt-5 sm:flex-row sm:items-start'>
              <ProductImage
                productId={params.productId}
                pictureCount={productInfo.pictureCount}
              />
              <ProductInfo
                productName={productInfo.name}
                productDescription={productInfo.description}
                cookieId={cookieId}
                variantList={JSON.stringify(productInfo.variant)}
                productId={params.productId}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }
}
