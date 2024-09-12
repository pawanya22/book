// src/components/AuthorSearch.js
import React, { useRef, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const AuthorSearch = () => {
  const { setSearchTerm, setSearchType, setResultTitle, setShowPopularBooks } = useGlobalContext();
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchText.current.value.trim();
    
    // Check if the input is empty or only contains special characters
    if ((tempSearchTerm.replace(/[^\w\s]/gi, "")).length === 0) {
      setSearchTerm("J.K. Rowling");
      setResultTitle("Please Enter an Author ...");
    } else {
      setSearchType("author"); // Set the search type to 'author'
      setSearchTerm(searchText.current.value);
    }
    setShowPopularBooks(false);
    navigate("/book");
  };

  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input
                type="text"
                className='form-control'
                placeholder='Search by Author...'
                ref={searchText}
              />
              <button type="submit" className='flex flex-c' onClick={handleSubmit}>
                <FaSearch className='text-purple' size={32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthorSearch;
