import Header from '../../components/home/Header';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import OfferSwiper from '../../components/foods/OfferSwiper';
import FristDeleBary from '../../components/foods/FristDeleBary';
import Pouulars from '../../components/foods/Pouulars';
import CustomerReviews from '../../components/clintReviw/CustomerReviews';
import AllResturentHome from '../../components/foods/AllResturentHome';
const Home = () => {
  return (
    <div>
      <Header />
      <CategorySlider />
      <OfferSwiper />
      <AllResturentHome />
      <FristDeleBary />
      <Pouulars />
      <CustomerReviews />
    </div>
  );
};

export default Home;
