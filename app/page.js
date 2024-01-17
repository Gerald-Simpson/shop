import NavBar from './_components/navBar';
import styles from './styles.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/'} />
      <div className='pageRemainder'>
        <h1 className='mainTitle'>Home Page</h1>
        <main className='flex flex-col items-center justify-between'>
          <p>Main content</p>
        </main>
      </div>
    </div>
  );
}
