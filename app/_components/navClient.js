'use client';

import Link from 'next/link';
import { useState } from 'react';
import { space, inter } from '../fonts.ts';

export default function NavBut(props) {
  const [showNav, navChange] = useState(false);
  const toggleNav = () => navChange(!showNav);
  if (showNav === false) {
    return (
      <div className='md:hidden'>
        <button className='text-3xl mx-4 md:hidden' onClick={() => toggleNav()}>
          &#8801;
        </button>
      </div>
    );
  } else if (showNav === true) {
    return (
      <div className={'md:hidden ' + space.className}>
        <button className='text-3xl mx-4 md:hidden' onClick={() => toggleNav()}>
          &#8801;
        </button>
        <div
          className='h-min absolute flex flex-col bg-gray-200
          inset-y-[92px] inset-x-0 w-screen z-40 box-border border-y border-slate-400'
        >
          <NavLinkMobile title='Home' href='/' activePath={props.activePath} />
          <NavLinkMobile
            title='Shop All'
            href='/shop'
            activePath={props.activePath}
          />
          <NavLinkMobile
            title='Coffee'
            href='/shop/coffee'
            activePath={props.activePath}
          />
          <NavLinkMobile
            title='Grinders'
            href='/shop/grinders'
            activePath={props.activePath}
          />
          <NavLinkMobile
            title='Brewers'
            href='/shop/brewers'
            activePath={props.activePath}
          />
          <NavLinkMobile
            title='Accessories'
            href='/shop/accessories'
            activePath={props.activePath}
          />
        </div>
        <div
          className='h-screen absolute inset-y-16 inset-x-0 w-screen z-30'
          onClick={() => toggleNav()}
        ></div>
      </div>
    );
  }
}

export function NavLinkMobile(props) {
  if (props.href === props.activePath) {
    return (
      <Link
        id={'nav' + props.title}
        href={props.href}
        className={
          'font-bold text-textAccent select-none py-4 mx-4 text-lg border-t border-slate-400'
        }
      >
        {props.title}
      </Link>
    );
  } else {
    return (
      <Link
        id={'nav' + props.title}
        href={props.href}
        className={'select-none py-4 mx-4 text-lg border-t border-slate-400'}
      >
        {props.title}
      </Link>
    );
  }
}
