export default function HeaderImage() {
  return (
    <div className="relative w-full h-screen min-h-[600px] md:min-h-[800px] overflow-hidden">
      {/* Background Image */}
      <img
        src="/webImage/Dashboard.png"
        alt="Background Snappie Photo Booth"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

      {/* Title */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-20 w-full px-4 text-center">
        <h1
          className="font-press text-5xl sm:text-6xl md:text-7xl font-bold text-snappieYellow2 tracking-wider leading-tight"
          style={{
            textShadow: "4px 4px 0px #000, -2px -2px 0px rgba(0,0,0,0.3)",
          }}
        >
          SNAPPIE
        </h1>
        <p
          className="font-roboto text-base sm:text-lg md:text-xl text-white mt-4 font-medium tracking-wide"
          style={{
            textShadow: "2px 2px 0px rgba(0,0,0,0.5)",
          }}
        >
          Photo Booth Experience
        </p>
      </div>
    </div>
  );
}
