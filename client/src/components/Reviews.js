import StarRating from './StarRating';

const Reviews = ({ selected: { restaurant, reviews } }) => {
  return (
    <div className='row row-cols-3 row-cols-md-3 g-4'>
      {reviews.map((review) => (
        <div className='col' key={review.id}>
          <div className='card text-white bg-primary'>
            <div className='card-header d-flex justify-content-between'>
              <span>{review.name}</span>
              <span>
                <StarRating rating={review.rating} />
              </span>
            </div>

            <div className='card-body'>
              <p className='card-text'>{review.review}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
