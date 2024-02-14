import Link from 'next/link';
import NavBar from '../_components/navBar';

export default function Commissions() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/commissions'} />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-light py-4 md:py-14'>Commissions</h1>
        <main className='flex flex-col items-center justify-between'></main>
      </div>
    </div>
  );
}
