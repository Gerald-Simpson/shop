import NavBar from './_components/navBar';
import styles from './styles.css';

export default async function Home() {
  return (
    <div className='h-screen flex flex-col items-center'>
      <NavBar activePath={'/'} />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-light py-4 md:py-14'>Home Page</h1>
        <main className='flex flex-col items-center justify-between'>
          <p>Main content</p>
        </main>
      </div>
    </div>
  );
}
