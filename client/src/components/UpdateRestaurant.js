import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import restaurantAPI from '../api/restaurantAPI';

const UpdateRestaurant = () => {
  const { id } = useParams();
  let history = useHistory();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    getOneRestaurant(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOneRestaurant = async (id) => {
    try {
      const {
        data: {
          data: { restaurant },
        },
      } = await restaurantAPI.get(`/${id}`);

      setName(restaurant.name);
      setLocation(restaurant.location);
      setPriceRange(restaurant.price_range);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await restaurantAPI.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form action='' className='form row g-3'>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id='name'
            className='form-control'
            type='text'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id='location'
            className='form-control'
            type='text'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='price_range'>Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id='price_range'
            className='form-control'
            type='number'
          />
        </div>

        <button
          className='btn btn-primary'
          type='submit'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default UpdateRestaurant;
