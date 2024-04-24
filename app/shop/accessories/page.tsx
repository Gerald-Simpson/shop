'use server';

import { renderedTiles } from '../page.tsx';
import NavBar from '../../_components/navBar';
import { fetchStockWithQuery } from '../../actions.tsx';

export default async function Accessories() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/shop/accessories'} />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-light py-4 md:py-14'>Accessories</h1>
        <main className='grid grid-cols-2 max-w-[1280px] w-full justify-between sm:grid-cols-3 md:grid-cols-4'>
          {await renderedTiles(
            await fetchStockWithQuery({ mainCategory: 'Accessories' }),
          )}
        </main>
      </div>
    </div>
  );
}
