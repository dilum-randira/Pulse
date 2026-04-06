import { Heart, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import ProfileCard from '../components/feed/ProfileCard';

function Feed() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await api.get('/matches/feed');
        setProfiles(response.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load your discovery feed.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const handleSwipe = async (action) => {
    if (!profiles.length || isSwiping) {
      return;
    }

    const currentProfile = profiles[0];

    try {
      setIsSwiping(true);
      setError('');

      const response = await api.post('/matches/swipe', {
        targetUserId: currentProfile._id,
        action,
      });

      if (response.data?.match) {
        setShowMatchModal(true);
        setTimeout(() => {
          setShowMatchModal(false);
        }, 1800);
      }

      setProfiles((prev) => prev.slice(1));
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to submit swipe right now.');
    } finally {
      setIsSwiping(false);
    }
  };

  if (isLoading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center text-romantic-accent">
        Loading nearby pulses...
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-md pb-6">
      {showMatchModal ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/45 px-6">
          <div className="w-full max-w-xs rounded-2xl bg-white p-6 text-center shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-romantic-secondary">Pulse Alert</p>
            <h3 className="mt-2 text-2xl font-bold text-romantic-primary">It's a Match!</h3>
            <p className="mt-2 text-sm text-gray-600">You both liked each other.</p>
          </div>
        </div>
      ) : null}

      {error ? <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      {profiles.length ? (
        <>
          <ProfileCard profile={profiles[0]} />

          <div className="mt-5 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => handleSwipe('pass')}
              disabled={isSwiping}
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-rose-300 bg-white text-rose-600 shadow-sm transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Pass"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              type="button"
              onClick={() => handleSwipe('like')}
              disabled={isSwiping}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-romantic-primary text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Like"
            >
              <Heart className="h-8 w-8" />
            </button>
          </div>
        </>
      ) : (
        <div className="mt-14 rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-romantic-primary">
            <Search className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-romantic-accent">No more pulses nearby. Check back later!</h2>
          <p className="mt-2 text-sm text-gray-600">We’ll refresh your discovery deck as new people appear near you.</p>
        </div>
      )}
    </section>
  );
}

export default Feed;