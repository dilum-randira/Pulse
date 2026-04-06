import { useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'feed';
  const { user, logout } = useAuth();

  const sectionTitle = tab === 'messages' ? 'Messages' : tab === 'profile' ? 'Profile' : 'Feed';

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Hi {user?.name || 'there'},</p>
        <h1 className="mt-1 text-2xl font-bold text-romantic-accent">{sectionTitle}</h1>
        <p className="mt-2 text-sm text-gray-600">
          This is a placeholder dashboard while we build Pulse matching and messaging.
        </p>
      </div>

      <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-romantic-accent">Coming soon</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
          <li>Personalized feed cards</li>
          <li>Real-time messages</li>
          <li>Profile editing experience</li>
        </ul>
      </div>

      <Button variant="outline" onClick={logout}>
        Log out
      </Button>
    </section>
  );
}

export default DashboardPage;
