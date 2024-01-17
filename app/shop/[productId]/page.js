import NavBar from '../../_components/navBar.js';
import {
  ProductImage,
  ProductInfo,
} from '../_components/productIdComponents.js';

//{params.productId}
//64e63ee03c9fbcb94a36d0ce

export default async function Page({ params }) {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/shop'} />
      <div className='mainCont'>
        <main className='flex w-full justify-between'>
          <div className='flex w-full pt-5'>
            <ProductImage productId={params.productId} />
            <ProductInfo productId={params.productId} />
          </div>
        </main>
      </div>
    </div>
  );
}
