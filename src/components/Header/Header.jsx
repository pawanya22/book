// src/components/Header.js
import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from '../ScreenForm/SearchForm';
import AuthorSearch from '../AuthorSearch/AuthorSearch'; // Add this import
import "./Header.css";
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from "../../images/Animation (2).json";

const Header = () => {
  return (
    <div className='holder'>
      <header className='header'>
        <Navbar />
        <div className='header-content flex flex-c text-center text-white'>
          <div className="text-section">
            <h2 className='header-title text-capitalize'>Uncover New Worlds Through Books</h2><br />
            <p className='header-text fs-18 fw-3'>
              Dive into a world of knowledge, imagination, and discovery. 
              With millions of books at your fingertips, you can explore everything from literary classics to the latest releases.
            </p>
            <SearchForm />  {/* Existing title search */}
            <AuthorSearch />  {/* New author search */}
          </div>
          <div className="animation-section">
            <Player
              autoplay
              loop
              src={animationData}
              style={{ height: '500px', width: '600px' }} 
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
