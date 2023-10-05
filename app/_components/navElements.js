'use client';

import styles from './NavBar.module.css';
import Link from 'next/link';
import { navLinks } from './navLinks';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GetPath(props) {
  const pathName = usePathname();
  useEffect(() => {}, [pathName]);
  return navLinks.map((link, index) => {
    if (pathName != link.path) {
      return (
        <Link
          id={'nav' + link.name}
          href={link.path}
          className={styles.nav}
          key={index}
        >
          {link.name != 'BASKET' ? link.name : 'BASKET' + props.basketCount}
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
          {link.name != 'BASKET' ? link.name : 'BASKET' + props.basketCount}
        </Link>
      );
    }
  });
}
