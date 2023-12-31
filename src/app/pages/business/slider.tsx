// components/SliderComponent.js
import React from 'react';
import Slider from 'react-slick';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import Navbar from '../navbar';
import StarIcon from '@mui/icons-material/Star';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderComponent = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
  };

  return (
    <Slider {...sliderSettings}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item}>
          <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <img
                src={'/images/useradva.png'}  
                alt="User Avatar"
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
              />
              <div>
                <h2>Name of Business</h2>
                <p>Username - Date</p>
              </div>
            </div>
            <p>Description of the business goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

            <img
              src={'/images/Rectangle 45.png'} 
              alt="Business Photo"
              style={{ width: '100%', height: 'auto', borderRadius: '5%', marginRight: '15px' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
              <IconButton>
                <StarIcon />
              </IconButton>
              <span>4 Stars</span>

              <IconButton style={{ marginLeft: '15px' }}>
                <ChatBubbleIcon />
              </IconButton>
              <span>4 Comments</span>

              <IconButton style={{ marginLeft: '15px' }}>
                <ShareIcon />
              </IconButton>
              <span>2 Shares</span>
            </div>
          </Paper>
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;
