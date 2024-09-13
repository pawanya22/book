import React from 'react';
import { useGlobalContext } from '../../context';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";
import PopularBooks from '../PopularBooks/PopularBooks'; // Import PopularBooks
import { motion } from 'framer-motion'; // Import Framer Motion
import { useInView } from 'react-intersection-observer'; // Import Intersection Observer

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

const BookList = () => {
  const { books, loading, resultTitle, showPopularBooks } = useGlobalContext();
  
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      id: (singleBook.id).replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
  });

  // Use Intersection Observer to detect when the book list is in view
  const { ref, inView } = useInView({
    triggerOnce: false, // Set to false to trigger the animation every time the section is scrolled into view
    threshold: 0.1, // 10% of the section needs to be visible before triggering
  });

  if (loading) return <Loading />;

  return (
    <div>
      {showPopularBooks && <PopularBooks />} {/* Conditionally render PopularBooks */}
      <motion.section 
        className='booklist'
        ref={ref} // Attach the ref to the section
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"} // Animate based on inView
        exit="exit"
      >
        <div className='container'>
          <div className='section-title'>
            <h2>{resultTitle}</h2>
          </div>
          <motion.div className='booklist-content grid'>
            {
              booksWithCovers.slice(0, 30).map((item, index) => (
                <motion.div key={index} variants={bookVariants}>
                  <Book {...item} />
                </motion.div>
              ))
            }
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default BookList;
