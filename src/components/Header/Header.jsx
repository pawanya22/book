import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from '../ScreenForm/SearchForm';
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>Uncover New Worlds Through Books</h2><br />
                <p className='header-text fs-18 fw-3'>Dive into a world of knowledge, imagination, and discovery. With millions of books at your fingertips, you can explore everything from literary classics to the latest releases.</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header