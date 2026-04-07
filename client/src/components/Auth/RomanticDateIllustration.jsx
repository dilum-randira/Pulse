import romanticDate from '../../assets/img1.png';

function RomanticDateIllustration() {
  return (
    <div className="hidden h-full bg-[#1b1450] md:block">
      <img
        src={romanticDate}
        alt="Romantic dinner date under the moonlight"
        className="h-full w-full rounded-r-lg object-cover object-center"
      />
    </div>
  );
}

export default RomanticDateIllustration;
