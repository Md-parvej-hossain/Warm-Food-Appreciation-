const PopularCard = ({ rating = 4, title, img, description }) => {
  return (
    <div className="group card bg-[#2a1f1b]  shadow-sm ">
      <figure className="px-4 pt-4">
        <img
          src={img}
          alt="img"
          className="relative rounded-xl object-cover group-hover:scale-110  duration-1000 w-64 h-40"
        />
        {/* Popular ribbon */}
        <span className="absolute left-10 top-15 bg-pink-600 text-white text-xs font-bold px-2 py-1 rotate-[-45deg] origin-left">
          POPULAR
          <p>Rating : {rating}k</p>
        </span>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PopularCard;
