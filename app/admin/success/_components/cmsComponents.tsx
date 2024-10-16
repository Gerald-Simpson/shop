'use client';
import { nextRebuild } from '../../../serverActions/serverControl.tsx';

export default function Cms() {
    return (
        <div>
            <button
                className='flex flex-col h-12 justify-center items-center text-center font-normal text-white border-2 border-white bg-black z-20 w-[200px] md:w-[300px] lg:w-[400px] sm:hover:bg-white sm:hover:text-black sm:hover:border-0'
                onClick={() => {
                    nextRebuild();
                }}
            >
                Rebuild
            </button>
            <p>successful login?</p>
            <a href='/admin/api/auth/logout'>Logout</a>
        </div>
    );
}
