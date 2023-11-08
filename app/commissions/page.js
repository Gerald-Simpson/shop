import Link from 'next/link';
import NavBar from '../_components/navBar';

export default function Commissions() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar path={'/commissions'} />
      <main className='flex flex-col items-center justify-between'>
        <p>Commissions</p>
      </main>
    </div>
  );
}
