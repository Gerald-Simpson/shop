'use server';

import Link from 'next/link';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Basket from './basket.js';
import {
  fetchBasket,
  fetchBasketCount,
  fetchStock,
  compareBasket,
} from '../actions.tsx';
import NavBut from './navClient.js';
import Image from 'next/image';
import { space, inter } from '../fonts.ts';

export default async function NavBar(props) {
  let cookieId = '';
  let cookieList = cookies();
  if (cookieList.has('id')) {
    cookieId = cookies().get('id').value;
  }
  let test = props.activePath;
  return (
    <div>
      <div
        className={
          'w-screen h-7 flex justify-center items-center bg-black/[.87] text-white text-[11px] ' +
          space.className
        }
      >
        Free delivery on orders over £25
      </div>
      <div className='w-screen h-16 flex flex-col items-center bg-gray-100'>
        <div className='w-full h-16 max-w-[1280px] flex items-center justify-between font-mono text-sm'>
          <NavBut className='md:hidden' activePath={test} />
          <div className='w-[40px] h-[40px] relative md:inset-x-4'>
            <Link href='/' className='text-4xl'>
              <Image
                src={'/logo.png'}
                alt='Logo for coffee shop.'
                fill={true}
              />
            </Link>
          </div>
          <div
            className={
              'flex justify-end md:justify-around md:w-5/6 lg:w-4/6 mx-4 ' +
              space.className
            }
          >
            <NavLink title={'Home'} href={'/'} activePath={test} />
            <NavLink
              title={'Shop All'}
              href={'/shop'}
              activePath={props.activePath}
            />
            <NavLink
              title={'Coffee'}
              href={'/shop/coffee'}
              activePath={props.activePath}
            />
            <NavLink
              title={'Grinders'}
              href={'/shop/grinders'}
              activePath={props.activePath}
            />
            <NavLink
              title={'Brewers'}
              href={'/shop/brewers'}
              activePath={props.activePath}
            />
            <NavLink
              title={'Accessories'}
              href={'/shop/accessories'}
              activePath={props.activePath}
            />
            <Basket
              comparedBasket={await compareBasket(cookieId)}
              basketCount={await fetchBasketCount(cookieId)}
              cookieId={cookieId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

async function NavLink(props) {
  if (props.href === props.activePath) {
    return (
      <Link
        id={'nav' + props.title}
        href={props.href}
        className={'text-textAccent font-bold select-none hidden md:flex'}
      >
        {props.title}
      </Link>
    );
  } else {
    return (
      <Link
        id={'nav' + props.title}
        href={props.href}
        className={
          'hover:text-textAccent hover:font-bold select-none hidden md:flex'
        }
      >
        {props.title}
      </Link>
    );
  }
}
