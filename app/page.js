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
          <p>this is a test to see how long it takes to update I guess</p>
          <p> i'm grumpy about it but i guess i can work with this</p>
        </main>
      </div>
    </div>
  );
}
