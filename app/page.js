import Link from 'next/link';
import NavBar from './_components/navBar';
import styles from './styles.css';
import Image from 'next/image';

export default async function Home() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/'} />
      <main className='flex flex-col w-full items-center'>
        <div className='flex flex-col items-center w-full pt-16'>
          <img
            alt='Background image of coffee beans.'
            src='/cover.jpg'
            className='absolute object-cover object-bottom brightness-[57%] h-[700px] w-full z-0'
          />
          <h1 className='text-5xl font-semibold pt-44 text-white z-10'>
            Single Origin Coffee
          </h1>
          <p className='self-center text-xl py-4 text-white z-10'>
            Browse our range of house blends and singel source coffees.
          </p>
          <div className='flex pt-8'>
            <Link
              className='flex flex-col w-[400px] h-12 justify-center items-center text-center font-medium bg-white mr-10 z-20'
              href={'/shop/coffee'}
            >
              <p>Shop Coffee</p>
            </Link>
            <Link
              className='flex flex-col w-[400px] h-12 justify-center items-center text-center font-medium text-white border-2 border-white bg-transparent z-20'
              href={'/shop/brewers'}
            >
              <p>Browse Brewers</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
/*
      style={{
        backgroundImage: 'url(/cover.jpg)',
      }}
      objectFit='cover'
      objectPosition='bottom'
 */
