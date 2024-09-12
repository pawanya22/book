// src/context.js
import React, { useState, useContext, useEffect, useCallback } from 'react';

const URL = "http://openlibrary.org/search.json?";
const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [searchTerm, setSearchTerm] = useState("Harry Potter");
  const [searchType, setSearchType] = useState("title"); // New state to differentiate title and author search
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const [showPopularBooks, setShowPopularBooks] = useState(true);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}${searchType}=${searchTerm}`);
      const data = await response.json();
      const { docs } = data;

      if (docs) {
        const newBooks = docs.slice(0, 20).map((bookSingle) => {
          const { key, author_name, cover_i, edition_count, first_publish_year, title } = bookSingle;

          return {
            id: key,
            author: author_name,
            cover_id: cover_i,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            title: title,
          };
        });

        setBooks(newBooks);

        if (newBooks.length > 1) {
          setResultTitle("Your Search Result");
        } else {
          setResultTitle("No Search Result Found!");
        }
      } else {
        setBooks([]);
        setResultTitle("No Search Result Found!");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm, searchType]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, searchType, fetchBooks]);

  return (
    <AppContext.Provider value={{
      loading, books, setSearchTerm, setSearchType, resultTitle, setResultTitle, searchTerm, searchType, showPopularBooks, setShowPopularBooks
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
