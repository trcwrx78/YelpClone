import { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import restaurantAPI from '../api/restaurantAPI';

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('Rating');

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      await restaurantAPI.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });

      // This is a weird approach think about refactor
      history.push('/');
      history.push(location.pathname);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form action='' className='form row mt-3 g-3'>
        <div className='col-md-8'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            id='name'
            placeholder='name'
            className='form-control'
          />
        </div>
        <div className='col-md-4'>
          <label htmlFor='name'>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            id='rating'
            className='form-select'
          >
            <option disabled>Rating</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>

        <div className='col-md-12'>
          <label htmlFor='Review'>Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id='Review'
            className='form-control'
          ></textarea>
        </div>

        <div className='col-md-3'>
          <button
            className='btn btn-primary'
            type='submit'
            onClick={handleSubmitReview}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddReview;
