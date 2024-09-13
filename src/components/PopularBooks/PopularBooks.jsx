import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion
import { useInView } from 'react-intersection-observer'; // Import Intersection Observer
import './PopularBooks.css'; // Ensure this is correctly imported

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -50, transition: { ease: 'easeInOut' } },
};

const bookVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // Use navigate hook

  const { ref, inView } = useInView({
    triggerOnce: false, // Set to false so it triggers the animation each time it comes into view
    threshold: 0.1, // 10% of the component is visible before triggering
  });

  useEffect(() => {
    async function fetchPopularBooks() {
      try {
        const response = await fetch('https://openlibrary.org/subjects/popular.json');
        const data = await response.json();
        if (data && data.works) {
          setBooks(data.works.slice(0, 20)); // Display top 10 popular books
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
    <motion.section
      className='popular-books'
      ref={ref} // Attach Intersection Observer ref to the section
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Trigger animation based on inView
      exit="exit"
    >
      <div className='container'>
        <div className='section-title'>
          <h2>Popular Books</h2>
        </div>
        <motion.div className='booklist-content horizontal-scroll'>
          {books.length > 0 ? (
            books.map((book) => (
              <motion.div
                className='book-item'
                key={book.key}
                onClick={() => handleBookClick(book.key.replace('/works/', ''))}
                variants={bookVariants}
              >
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                  alt={book.title}
                />
                <div className='book-item-info'>
                  <span className='book-item-info-item title'>{book.title}</span>
                  <span className='book-item-info-item author'>{book.author_name?.join(", ")}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No popular books found.</p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PopularBooks;
