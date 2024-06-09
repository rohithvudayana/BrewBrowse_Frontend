import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import styled from 'styled-components';

const ThumbsUpRating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onRate) {
      onRate(newRating);
    }
  };

  const renderThumbs = () => {
    const thumbs = [];
    for (let i = 1; i <= 5; i++) {
      thumbs.push(
        <FaThumbsUp
          key={i}
          size={20}
          color={i <= rating ? '#000000' : '#C0C0C0'}
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer', padding: '4px' }}
        />
      );
    }
    return thumbs;
  };

  return (
    <ThumbsContainer>
      {renderThumbs()}
    </ThumbsContainer>
  );
};

const ThumbsContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

export default ThumbsUpRating;
