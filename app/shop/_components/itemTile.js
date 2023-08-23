import Image from 'next/image';

export default function ItemTile(props) {
  return (
    <div className='flex flex-col flex-wrap items-center max-w-[23%] min-w-[10%] px-[0.25rem] py-[1rem] mx-[0.25rem] my-[1rem]'>
      <div className='tileImg' sizes='22%'>
        <Image
          className='tileImgOne'
          width='300'
          placeholder='blur'
          src={props.img1}
        />
        <Image
          className='tileImgTwo'
          width='300'
          placeholder='blur'
          src={props.img2}
        />
      </div>
      <div className='flex flex-col items-center text-center mx-[1rem] my-[0.5rem]'>
        <h3 className='shopLabel'>{props.description}</h3>
        <p className='shopPrice'>{props.price}</p>
      </div>
    </div>
  );
}
