'use client';

import './global.css';
import Header from '../components/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='min-w-min'>
        <header className="bg-gray-50">
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
            <Header />
            {children}
          </div>
        </header>
      </body>
    </html>
  );
}
