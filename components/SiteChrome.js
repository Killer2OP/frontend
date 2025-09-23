'use client'

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DelayedRegisterPrompt from '@/components/DelayedRegisterPrompt';

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Do not render public site chrome on admin routes
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <DelayedRegisterPrompt />
      <Footer />
    </>
  );
}
