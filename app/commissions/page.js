import Link from 'next/link';
import NavBar from '../_components/navBar';

export default function Commissions() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/commissions'} />
      <div className='pageRemainder'>
        <h1 className='mainTitle'>Commissions</h1>
        <main className='flex flex-col items-center justify-between'></main>
      </div>
    </div>
  );
}
