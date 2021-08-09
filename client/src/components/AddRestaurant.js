import { useState, useContext } from 'react';
import restaurantAPI from '../api/restaurantAPI';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        data: {
          data: { restaurant },
        },
      } = await restaurantAPI.post('/', {
        name,
        location,
        price_range: priceRange,
      });

      addRestaurant(restaurant);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form action='' className='form row g-3'>
        <div className='col-md-4'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            className='form-control'
            placeholder='name'
          />
        </div>
        <div className='col-md-4'>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type='text'
            className='form-control'
            placeholder='location'
          />
        </div>
        <div className='col-md-3'>
          <select
            className='form-select'
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option selected disabled>
              Price Range
            </option>
            <option value='1'>$</option>
            <option value='2'>$$</option>
            <option value='3'>$$$</option>
            <option value='4'>$$$$</option>
            <option value='5'>$$$$$</option>
          </select>
        </div>
        <div className='col-md-1'>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddRestaurant;
