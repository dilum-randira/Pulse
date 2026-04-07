import romanticDate from '../../assets/romantic-date.svg';

function RomanticDateIllustration() {
  return (
    <div className="hidden h-full md:block">
      <img
        src={romanticDate}
        alt="Romantic dinner date under the moonlight"
        className="h-full w-full rounded-r-lg object-cover"
      />
    </div>
  );
}

export default RomanticDateIllustration;
