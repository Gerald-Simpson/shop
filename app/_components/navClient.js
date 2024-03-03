'use client';

import Link from 'next/link';
import { useState } from 'react';
import NavLink from './navBar.js';

export default function NavBut(props) {
  const [showNav, navChange] = useState(false);
  const toggleNav = () => navChange(!showNav);
  if (showNav === false) {
    return (
      <div className='md:hidden'>
        <button className='text-3xl px-4 md:hidden' onClick={() => toggleNav()}>
          &#8801;
        </button>
      </div>
    );
  } else if (showNav === true) {
    return (
      <div className='md:hidden'>
        <button className='text-3xl px-4 md:hidden' onClick={() => toggleNav()}>
          &#8801;
        </button>
        <div
          className='h-min absolute flex flex-col bg-gray-200
          inset-y-[92px] inset-x-0 w-screen z-40 box-border border-y border-slate-400'
        >
          <Link
            id='navHome'
            href='/'
            className='select-none py-4 px-4 text-lg border-slate-400'
          >
            HOME
          </Link>
          <Link
            id='navShop'
            href='/shop'
            className='select-none py-4 px-4 text-lg border-t border-slate-400'
          >
            SHOP ALL
          </Link>
          <Link
            id='navCoffee'
            href='/shop/coffee'
            className='select-none py-4 px-4 text-lg border-t border-slate-400'
          >
            COFFEE
          </Link>
          <Link
            id='navGrinders'
            href='/shop/grinders'
            className='select-none py-4 px-4 text-lg border-t border-slate-400'
          >
            GRINDERS
          </Link>
          <Link
            id='navBrewers'
            href='/shop/brewers'
            className='select-none py-4 px-4 text-lg border-t border-slate-400'
          >
            BREWERS
          </Link>
          <Link
            id='navAccessories'
            href='/shop/accessories'
            className='select-none py-4 px-4 text-lg border-t border-slate-400'
          >
            ACCESSORIES
          </Link>
        </div>
        <div
          className='h-screen absolute inset-y-16 inset-x-0 w-screen z-30'
          onClick={() => toggleNav()}
        ></div>
      </div>
    );
  }
}
