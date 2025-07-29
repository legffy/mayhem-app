'use client'
import SideBar from '@/components/SideBar';
import UserSuggestions from '@/components/UserSuggestions';

export default function MainLayout({ children }) {
  return (
    <div className="flex bg-black min-h-screen text-white">
      <SideBar />
      <main className="w-4/6">{children}</main>
      <UserSuggestions />
    </div>
  );
}