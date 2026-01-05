import videoBg from '../../assets/videoBg.mp4';

const Header = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
        src={videoBg}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4 ">
        {/* Title */}
        <h1
          className="text-2xl sm:text-4xl md:text-6xl  mb-4 "
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Order Takeaway or Delivery Food
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl "
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          Ridiculus sociosqu cursus neque cursus curae ante scelerisque
          vehicula.
        </p>

        {/* Search Bar */}
        <div
          className="w-full max-w-3xl relative shadow-lg  "
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <input
            type="text"
            placeholder="Search for food, restaurants, or location..."
            className="w-full pl-12 pr-32 py-4 rounded-full  shadow-xl outline-none bg-white/20 backdrop-blur-none text-white-800"
          />

          {/* Icon */}
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            🔍
          </span>

          {/* Button */}
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
            Find Food
          </button>
        </div>

        {/* Stats Section */}
        <div className="absolute bottom-0 w-full bg-white/10 backdrop-blur-md py-4">
          <div className="flex  sm:flex-row items-center justify-center gap-4 sm:gap-10 text-white font-semibold">
            <div className="text-lg sm:text-xl md:text-2xl">
              2650{' '}
              <span className="font-normal block sm:inline">Restaurant</span>
            </div>

            <div className="text-lg sm:text-xl md:text-2xl">
              5350{' '}
              <span className="font-normal block sm:inline">People Served</span>
            </div>

            <div className="text-lg sm:text-xl md:text-2xl">
              12350{' '}
              <span className="font-normal block sm:inline">
                Registered Users
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
