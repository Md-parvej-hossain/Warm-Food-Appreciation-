import { Link } from 'react-router';

const cardData = [
  {
    id: 1,
    title: 'Tehari Xpress',
    image: 'https://i.ibb.co/MkpF0x7/sundarbans.jpg',
    rating: 4.3,
    reviews: '100+',
    discount1: '15% off Tk. 699: eb120',
    discount2: '15% off Tk. 50',
    time: '20-45 min',
    category: 'Tehari',
    firstOrder: 'Free for first order',
  },
  // Add more cards as needed
];

const CardComponent = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cardData.map(card => (
        <Link to={`/restaurant/${card.id}`} key={card.id}>
          <div className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl">
            <figure className="relative">
              <img
                src={card.image}
                alt={card.title}
                className="h-44 w-full object-cover"
              />

              {/* Discount badges */}
              <div className="absolute top-2 left-2 space-y-1">
                <span className="badge badge-error text-white">
                  {card.discount1}
                </span>
                <span className="badge badge-error text-white">
                  {card.discount2}
                </span>
              </div>

              {/* Favorite icon */}
              <button className="absolute top-2 right-2 btn btn-circle btn-xs bg-white">
                ❤
              </button>
            </figure>

            <div className="card-body p-4">
              <h3 className="font-semibold text-base truncate">{card.title}</h3>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-orange-500">★ {card.rating}</span>
                <span className="text-gray-500">({card.reviews})</span>
              </div>

              <p className="text-sm text-gray-500">
                {card.time} · {card.category}
              </p>

              <p className="text-success text-sm font-medium">
                {card.firstOrder}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardComponent;
