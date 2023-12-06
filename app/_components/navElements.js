'use client';

import styles from './NavBar.module.css';
import Link from 'next/link';
import { navLinks } from './navLinks';
import { useState } from 'react';
import BasketOverlay from './basketOverlay';

export default function NavElements(props) {
  const basketCount = props.basketCount;
  const [showBasket, basketChange] = useState(false);
  const toggleBasket = () => basketChange(!showBasket);
  return navLinks.map((link, index) => {
    if (props.path != link.path) {
      if (link.name != 'BASKET') {
        return (
          <Link
            id={'nav' + link.name}
            href={link.path}
            className={styles.nav}
            key={index}
          >
            {link.name}
          </Link>
        );
      } else if (link.name === 'BASKET') {
        return (
          <div>
            <BasketOverlay
              showBasket={showBasket}
              onClick={toggleBasket}
              basketCount={props.basketCount}
              basketData={props.basketData}
              stockData={props.stockData}
            />
            <button
              id={'nav' + link.name}
              href={link.path}
              className={styles.nav}
              key={index}
              onClick={() => toggleBasket()}
            >
              {'BASKET ' + basketCount}
            </button>
          </div>
        );
      }
    } else {
      if (link.name != 'BASKET') {
        return (
          <Link
            id={'nav' + link.name}
            href={link.path}
            className={styles.navActive}
            key={index}
          >
            {link.name}
          </Link>
        );
      } else if (link.name === 'BASKET') {
        return (
          <div>
            <BasketOverlay
              showBasket={showBasket}
              onClick={toggleBasket}
              basketCount={props.basketCount}
              basketData={props.basketData}
              stockData={props.stockData}
            />
            <button
              id={'nav' + link.name}
              href={link.path}
              className={styles.navActive}
              key={index}
              onClick={() => toggleBasket()}
            >
              {link.name != 'BASKET' ? link.name : 'BASKET ' + basketCount}
            </button>
          </div>
        );
      }
    }
  });
}
