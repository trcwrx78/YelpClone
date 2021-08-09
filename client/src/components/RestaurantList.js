import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import restaurantAPI from '../api/restaurantAPI';
import StarRating from './StarRating';

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();

  useEffect(() => {
    getRestaurantData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRestaurantData = async () => {
    try {
      const {
        data: {
          data: { restaurants },
        },
      } = await restaurantAPI.get('/');

      setRestaurants(restaurants);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    try {
      await restaurantAPI.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();

    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (rating, count) => {
    if (!count) {
      return <span className='text-warning ml-1'>0 reviews</span>;
    }

    return (
      <>
        <StarRating rating={rating} />
        <span className='text-warning ml-1'>({count})</span>
      </>
    );
  };

  return (
    <div className='row mt-3'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='table-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants?.map(
            ({ id, name, location, price_range, count, average_rating }) => (
              <tr key={id} onClick={() => handleRestaurantSelect(id)}>
                <td>{name}</td>
                <td>{location}</td>
                <td>{'$'.repeat(price_range)}</td>
                <td>{renderRating(average_rating, count)}</td>
                <td>
                  <button
                    className='btn btn-warning'
                    onClick={(e) => handleUpdate(e, id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={(e) => handleDelete(e, id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
