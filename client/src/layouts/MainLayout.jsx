import { Outlet } from 'react-router-dom';
import BottomNav from '../components/navigation/BottomNav';
import TopHeader from '../components/navigation/TopHeader';

function MainLayout() {
  return (
    <div className="min-h-screen bg-rose-50 text-gray-900">
      <TopHeader />
      <main className="mx-auto min-h-screen max-w-md px-4 pb-20 pt-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default MainLayout;
