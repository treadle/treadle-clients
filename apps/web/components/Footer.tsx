import type { FC } from 'react';
import Image from 'next/image';

const Footer: FC = () => {
  return (
    <footer className='py-6 justify-center items-center flex w-full left-0 bottom-0 bg-footer absolute'>
      <div className='flex items-center gap-x-2'>
        <Image height={64} width={64} src='/logo.svg' alt='logotype' />
        <span className='uppercase font-bold text-white text-[28px]'>treadle</span>
      </div>
    </footer>
  );
};

export default Footer;