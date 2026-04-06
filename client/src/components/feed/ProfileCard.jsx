function ProfileCard({ profile }) {
  const image = profile?.images?.[0] || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80';

  return (
    <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-md">
      <img src={image} alt={profile?.name || 'Profile'} className="h-[480px] w-full object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h2 className="text-2xl font-bold">{profile?.name}</h2>
        <p className="mt-2 line-clamp-3 text-sm text-white/90">{profile?.bio || 'No bio yet.'}</p>
      </div>
    </div>
  );
}

export default ProfileCard;