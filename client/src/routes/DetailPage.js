import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import restaurantAPI from '../api/restaurantAPI';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

const DetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    getCurrentRestaurant(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentRestaurant = async () => {
    try {
      const {
        data: { data },
      } = await restaurantAPI.get(`/${id}`);

      setSelectedRestaurant(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className='fw-lighter display-1 text-center'>
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className='text-center'>
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className='text-warning ml-1'>
              {selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : '(0)'}
            </span>
          </div>
          <div className='mt-3'>
            <Reviews selected={selectedRestaurant} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default DetailPage;
