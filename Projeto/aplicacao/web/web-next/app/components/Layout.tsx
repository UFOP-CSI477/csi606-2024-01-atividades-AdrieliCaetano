import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-accent mx-auto p-4 content-center">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;