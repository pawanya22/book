import React, { useState, useEffect } from 'react';

function BookReviews({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    // Load reviews from localStorage
    const storedReviews = localStorage.getItem(`reviews-${bookId}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [bookId]);

  const handleAddReview = () => {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setNewReview('');
    // Save reviews to localStorage
    localStorage.setItem(`reviews-${bookId}`, JSON.stringify(updatedReviews));
  };

  return (
    <div>
      <h3>Reviews:</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Write a review"
      />
      <button onClick={handleAddReview}>Add Review</button>
    </div>
  );
}

export default BookReviews;
