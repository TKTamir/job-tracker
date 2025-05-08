import React from 'react';
import Navbar from "../NavBar/Navbar.tsx";
import Footer from "../Footer/Footer.tsx";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-grow pb-12">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;