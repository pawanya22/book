import React from 'react';
import "./About.css";
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from "../../images/ani.json"; // Ensure this path is correct

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About Us</h2>
          <p className='intro-text'>Welcome to Litheaven, your ultimate online destination for discovering books that spark your interest!</p>
        </div>

        <div className='about-content grid'>
          <div className='animation-section'>
            <Player
              autoplay
              loop
              src={animationData}
              style={{ height: '1000px', width: '800px', marginLeft: '-200px' }} // Adjust size and margin
            />
          </div>
          
          <div className='about-text'>
            <h3>Who We Are</h3>
            <p>At Litheaven, our mission is to make the world of books accessible and enjoyable for everyone. We are passionate about reading and believe that everyone should have the tools to find their next great read easily. Our team is dedicated to providing a comprehensive and user-friendly platform that helps book enthusiasts, casual readers, and researchers alike discover, explore, and enjoy books.</p>
            <h3>Our Journey</h3>
            <p>Litheaven started with a simple idea: to create a space where book lovers could easily find and explore books. Over time, we’ve expanded our features and improved our platform based on user feedback and technological advancements. Today, we continue to grow and evolve, always with our users’ needs in mind.</p>
            <h3>Get In Touch</h3>
            <p>We love hearing from our users! If you have any questions, feedback, or suggestions, please don’t hesitate to reach out.</p>
            <p>Thank you for choosing Litheaven. We hope you find your next great book with us!</p>
            <p>Happy Reading!</p>
            <p><strong>The Litheaven Team</strong></p>
          </div>
        
        </div>
      </div>
    </section>
  );
}

export default About;
