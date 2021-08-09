import AddRestaurant from '../components/AddRestaurant';
import Header from '../components/Header';
import RestaurantList from '../components/RestaurantList';

const Home = () => {
  return (
    <>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </>
  );
};

export default Home;
