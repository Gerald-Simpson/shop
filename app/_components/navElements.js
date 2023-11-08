'use client';

import styles from './NavBar.module.css';
import Link from 'next/link';
import { navLinks } from './navLinks';
import { useState } from 'react';

export default function NavElements(props) {
  //const [basketCount, updateCount] = useState(props.basketCount);
  const basketCount = props.basketCount;
  return navLinks.map((link, index) => {
    if (props.path != link.path) {
      return (
        <Link
          id={'nav' + link.name}
          href={link.path}
          className={styles.nav}
          key={index}
        >
          {link.name != 'BASKET' ? link.name : 'BASKET' + basketCount}
        </Link>
      );
    } else {
      return (
        <Link
          id={'nav' + link.name}
          href={link.path}
          className={styles.navActive}
          key={index}
        >
          {link.name != 'BASKET' ? link.name : 'BASKET' + basketCount}
        </Link>
      );
    }
  });
}
