import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularBooks.css'; // Ensure this is correctly imported

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    async function fetchPopularBooks() {
      try {
        const response = await fetch('https://openlibrary.org/subjects/popular.json');
        const data = await response.json();
        if (data && data.works) {
          setBooks(data.works.slice(0, 10)); // Display top 10 popular books
        } else {
          console.error("Failed to fetch popular books data.");
        }
      } catch (error) {
        console.error("Error fetching popular books:", error);
      }
    }
    fetchPopularBooks();
  }, []);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`); // Navigate to the BookDetails page
  };

  return (
    <section className='popular-books'>
      <div className='container'>
        <div className='section-title'>
          <h2>Popular Books</h2>
        </div>
        <div className='booklist-content horizontal-scroll'>
          {books.length > 0 ? (
            books.map((book) => (
              <div
                className='book-item'
                key={book.key}
                onClick={() => handleBookClick(book.key.replace('/works/', ''))}
              >
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                  alt={book.title}
                />
                <div className='book-item-info'>
                  <span className='book-item-info-item title'>{book.title}</span>
                  <span className='book-item-info-item author'>{book.author_name?.join(", ")}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No popular books found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;
