import ImageUpload from '../components/profile/ImageUpload';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const primaryImage = user.images?.[0] || null;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 rounded-full overflow-hidden bg-romantic-soft border border-romantic-primary/40">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-romantic-muted text-sm">
              No photo
            </div>
          )}
        </div>
        <div>
          <h1 className="text-xl font-semibold text-romantic-ink">{user.name}</h1>
          {user.bio && (
            <p className="text-sm text-romantic-muted line-clamp-2 mt-1">{user.bio}</p>
          )}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-romantic-muted uppercase tracking-wide">
          Photos
        </h2>
        <ImageUpload />
        {user.images && user.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {user.images.map((image, index) => (
              <img
                key={image + index}
                src={image}
                alt={`Profile ${index + 1}`}
                className="h-28 w-full object-cover rounded-lg"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
