'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      router.push('/main'); 
    } else {
      router.push('/front');
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <p>Loading...</p>
    </div>
  );
}