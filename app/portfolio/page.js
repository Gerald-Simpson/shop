import Link from 'next/link';
import NavBar from '../_components/navBar';

export default function Portfolio() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar path={'/portfolio'} />
      <h1>Portfolio</h1>
      <main className='flex flex-col items-center justify-between'>
        <p>Portfolio</p>
      </main>
    </div>
  );
}
