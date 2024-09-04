'use server';

import { renderedTiles } from '../_components/itemTile.tsx';
import NavBar from '../../_components/navBar';
import { fetchStockWithCategory } from '@/app/serverActions/viewActions.tsx';

export default async function Brewers() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/shop/brewers'} />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-light py-4 md:py-14'>Brewers</h1>
        <main className='grid grid-cols-2 max-w-[1280px] w-full justify-between sm:grid-cols-3 md:grid-cols-4'>
          {await renderedTiles(await fetchStockWithCategory('Brewers'))}
        </main>
      </div>
    </div>
  );
}
