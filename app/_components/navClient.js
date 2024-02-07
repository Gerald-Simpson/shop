'use client';

import Link from 'next/link';
import { useState } from 'react';
import NavLink from './navBar.js';

export default function NavBut(props) {
  const [showNav, navChange] = useState(false);
  const toggleNav = () => navChange(!showNav);
  if (showNav === false) {
    return (
      <div className=''>
        <button className='text-3xl px-4 md:hidden' onClick={() => toggleNav()}>
          &#8801;
        </button>
      </div>
    );
  } else if (showNav === true) {
    return (
      <div className=''>
        <button className='text-3xl px-4 md:hidden' onClick={() => toggleNav()}>
          &#8801;
        </button>
        <div
          className='h-min absolute flex flex-col bg-backgroundBlue
          inset-y-16 inset-x-0 w-screen z-50 box-border border-y border-slate-400'
        >
          <Link
            id='navHome'
            href='/'
            className='select-none py-4 px-4 text-lg border-slate-400'
          >
            HOME
          </Link>
          <Link
            id='navPortfolio'
            href='/portfolio'
            className='select-none py-4 px-4 text-lg border-t border-slate-400'
          >
            PORTFOLIO
          </Link>
          <Link
            id='navShop'
            href='/shop'
            className='select-none py-4 px-4 text-lg border-t border-slate-400'
          >
            SHOP
          </Link>
          <Link
            id='navCommissions'
            href='/commissions'
            className='select-none py-4 px-4 text-lg border-t border-slate-400'
          >
            COMMISSIONS
          </Link>
        </div>
      </div>
    );
  }
}
