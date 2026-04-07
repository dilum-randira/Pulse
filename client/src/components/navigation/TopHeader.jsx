import { Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function TopHeader() {
  const { user } = useAuth();

  const avatar = user?.images?.[0];

  return (
    <header className="fixed left-0 right-0 top-0 z-20 border-b border-rose-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-md items-center justify-between px-4">
        <div className="flex items-center gap-2 text-romantic-primary">
          <Flame className="h-5 w-5" />
          <span className="text-lg font-bold tracking-tight">Pulse</span>
        </div>

        {user && (
          <Link
            to="/profile"
            className="relative h-9 w-9 overflow-hidden rounded-full border border-romantic-primary/50 bg-romantic-soft flex-shrink-0"
          >
            {avatar ? (
              <img
                src={avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-medium text-romantic-muted">
                {user.name?.[0]?.toUpperCase() || '?'}
              </div>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}

export default TopHeader;
