import Link from 'next/link';
import styles from './styles.css';
import ItemTile from './_components/itemTile';
import img1 from '../_components/productImages/item2A.jpg';
import img2 from '../_components/productImages/item2B.jpg';

export default function Shop() {
  return (
    <div className='mainCont'>
      <h1 className='mainTitle'>Shop</h1>
      <main className='flex flex-wrap w-full justify-between'>
        <ItemTile
          img1={img1}
          img2={img2}
          price='£12.99'
          description='this is a test description'
        />
        <ItemTile
          img1={img1}
          img2={img2}
          price='£12.99'
          description='this is a test description'
        />
        <ItemTile
          img1={img1}
          img2={img2}
          price='£12.99'
          description='this is a test description'
        />
        <ItemTile
          img1={img1}
          img2={img2}
          price='£12.99'
          description='this is a test description'
        />
        <ItemTile
          img1={img1}
          img2={img2}
          price='£12.99'
          description='this is a test description'
        />
        <ItemTile
          img1={img1}
          img2={img2}
          price='£12.99'
          description='this is a test description'
        />
        <ItemTile
          img1={img1}
          img2={img2}
          price='£12.99'
          description='this is a test description'
        />
      </main>
    </div>
  );
}
