import styles from './NavBar.module.css';
import Link from 'next/link';
import { navLinks } from './navLinks';
import GetPath from './navElements';
import { Suspense } from 'react';

export default function NavBar() {
    return (
        <div className='w-full h-20 flex items-center justify-between font-mono text-sm bg-white px-80'>
            <Link href='/' className='text-4xl'>
                Logo
            </Link>
            <div className='flex w-2/4 justify-evenly'>
                <Suspense fallback={null}>
                    <GetPath />
                </Suspense>
            </div>
        </div>
    );
}
