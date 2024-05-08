import Link from 'next/link';
import NavBar from './_components/navBar';

export default async function Home() {
  return (
    <div className='h-screen flex flex-col items-center min-w-[250px]'>
      <NavBar activePath={'/'} />
      <main className='flex flex-col w-full min-w-[250px]'>
        <div className='flex flex-col items-center text-center w-full min-w-[250px] pt-8 md:pt-16'>
          <img
            alt='Background image of coffee beans.'
            src='/cover.jpg'
            className='absolute object-cover object-bottom brightness-[57%] w-full min-w-[250px] z-0 h-[700px]'
          />
          <h1 className=' font-bold text-white z-10 pt-20 md:pb-2 md:pt-44 text-3xl md:text-5xl'>
            Single Origin Coffee
          </h1>
          <p className='self-center text-xl py-4 text-white z-10'>
            Browse our range of house blends and single source coffees
          </p>
          <div className='flex flex-col pt-8 content-center items-center md:flex-row'>
            <Link
              className='flex flex-col h-12 justify-center items-center text-center font-normal bg-white z-20 mb-8 md:mb-0 w-[200px] md:w-[300px] lg:w-[400px] md:mr-10 hover:bg-transparent hover:text-white hover:border-2 hover:border-white '
              href={'/shop/coffee'}
            >
              <p>Shop Coffee</p>
            </Link>
            <Link
              className='flex flex-col h-12 justify-center items-center text-center font-normal text-white border-2 border-white bg-transparent z-20 w-[200px] md:w-[300px] lg:w-[400px] hover:bg-white hover:text-black hover:border-0'
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
