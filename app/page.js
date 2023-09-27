import styles from './styles.css';

export default function Home() {
  return (
    <div className='h-screen flex flex-col'>
      <h1>Home Page</h1>
      <main className='flex flex-col items-center justify-between'>
        <p>Main content</p>
      </main>
    </div>
  );
}
