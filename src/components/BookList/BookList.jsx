// src/components/BookList/BookList.js
import React from 'react';
import { useGlobalContext } from '../../context';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";
import PopularBooks from '../PopularBooks/PopularBooks'; // Import PopularBooks

const BookList = () => {
  const { books, loading, resultTitle, showPopularBooks } = useGlobalContext();
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      id: (singleBook.id).replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
  });

  if (loading) return <Loading />;

  return (
    <div>
      {showPopularBooks && <PopularBooks />} {/* Conditionally render PopularBooks */}
      <section className='booklist'>
        <div className='container'>
          <div className='section-title'>
            <h2>{resultTitle}</h2>
          </div>
          <div className='booklist-content grid'>
            {
              booksWithCovers.slice(0, 30).map((item, index) => (
                <Book key={index} {...item} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default BookList;
