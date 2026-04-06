import { Flame } from 'lucide-react';

function TopHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-20 border-b border-rose-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-md items-center px-4">
        <div className="flex items-center gap-2 text-romantic-primary">
          <Flame className="h-5 w-5" />
          <span className="text-lg font-bold tracking-tight">Pulse</span>
        </div>
      </div>
    </header>
  );
}

export default TopHeader;
