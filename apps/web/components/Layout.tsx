import type { FC, PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  fontVariable: string;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, fontVariable }) => {
  return (
    <div className={`${fontVariable} font-sans max-w-[1280px] px-4 mx-auto h-full`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;