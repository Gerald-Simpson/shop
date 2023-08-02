import Link from 'next/link';
export default function Footer() {
  return (
    <div className='w-full h-20 flex items-center justify-between font-mono text-sm bg-white px-80'>
      <Link href='/' className='text-4xl'>
        Footer
      </Link>
      <div className='flex w-2/4 justify-evenly'>
        <Link href='/' className='nav'>
          Home
        </Link>
        <Link href='/basket' className='nav'>
          Portfolio
        </Link>
        <Link href='/' className='nav'>
          Shop
        </Link>
        <Link href='/' className='nav'>
          Commissions
        </Link>
      </div>
    </div>
  );
}
