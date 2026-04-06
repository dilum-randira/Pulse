import { Heart, MessageCircle, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Feed', icon: Heart },
  { to: '/matches', label: 'Messages', icon: MessageCircle },
  { to: '/matches', label: 'Profile', icon: User },
];

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-rose-100 bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto grid h-16 max-w-md grid-cols-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-xs font-medium ${
                isActive ? 'text-romantic-primary' : 'text-gray-500'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
