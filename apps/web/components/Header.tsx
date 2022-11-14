import type { FC } from 'react';
import Image from 'next/image';


const Header: FC = () => {
  return (
    <header className='p-6 flex justify-between items-center'>
      <div className='flex items-center gap-x-2'>
        <Image height={64} width={64} src='/logo.svg' alt='logotype' priority />
        <span className='uppercase font-bold text-white text-[28px]'>treadle</span>
      </div>
      <nav className='flex'>
        <ul className='flex items-center gap-x-4 mr-8'>
          <li>
            <a href='#' className='text-white text-[16px] leading-[22px]'>
              About
            </a>
          </li>
          <li>
            <a href='#' className='text-white text-[16px] leading-[22px]'>
              Media
            </a>
          </li>
          <li>
            <a href='#' className='text-white text-[16px] leading-[22px]'>
              Team
            </a>
          </li>
        </ul>
        <a href='/path/to/app' className='px-4 py-2 bg-button rounded-[16px] text-white' download='treadle'>
          Download
        </a>
      </nav>
    </header>
  );
};

export default Header;