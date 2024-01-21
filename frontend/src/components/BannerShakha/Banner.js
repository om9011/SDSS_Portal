import React, { useState } from 'react';
import './Banner.css';
import { useNavigate } from 'react-router-dom';

const banners = [
  {
    title: 'Discover Your Inner Radiance with Swa-Roopwardhinee',
    subtitle: 'Empowering Your Journey to Self-Discovery and Fulfillment',
    buttonText: 'Explore Now',
    backgroundColor: '#009D94',
  },
  {
    title: 'Awaken Your Potential with Swa-Roopwardhinee',
    subtitle: 'Embark on a Journey of Self-Transformation and Empowerment',
    buttonText: 'Discover More',
    backgroundColor: '#008080',
  },
  {
    title: 'Empower Your Essence with Swa-Roopwardhinee',
    subtitle: 'Unlock the Infinite Possibilities Within You',
    buttonText: 'Begin Your Journey',
    backgroundColor: '#309490',
  },
  {
    title: 'Harmony of Mind, Body, and Spirit',
    subtitle: 'Experience the Balance with Swa-Roopwardhinee',
    buttonText: 'Discover Harmony',
    backgroundColor: '#44A9AA',
  },
];

const Slider = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prevBanner) => (prevBanner < banners.length - 1 ? prevBanner + 1 : 0));
  };

  const prevBanner = () => {
    setCurrentBanner((prevBanner) => (prevBanner > 0 ? prevBanner - 1 : banners.length - 1));
  };

  const renderCurrentBanner = () => {
    const { title, subtitle, buttonText, backgroundColor } = banners[currentBanner];
    return (
      <div className="banner" style={{ backgroundColor }}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a href='https://www.swaroopwardhinee.org/'><button onClick={exploreNow}>{buttonText}</button></a>
      </div>
    );
  };

  const exploreNow = () => {
        alert("Redirecting to explore page!");
    
  };

  return (
    <div className="banner-slider-container">
      <div className="slider-content" style={{ transform: `translateX(${-currentBanner * 100}%)` }}>
        {banners.map((_, index) => (
          <div key={index} className="banner-container">
            {renderCurrentBanner()}
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={prevBanner}>&#8249;</button>
      <button className="next-button" onClick={nextBanner}>&#8250;</button>
    </div>
  );
};

export default Slider;
