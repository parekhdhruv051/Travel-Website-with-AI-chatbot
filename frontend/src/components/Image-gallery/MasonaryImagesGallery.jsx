import React from 'react';
import galleryImages from './galleryImages';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const MasonaryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonry gutter="0.5rem">
        {
          galleryImages.map((item, index) => (
            <img 
              key={index}
              src={item}
              alt={`gallery-${index}`}
              className="masonry__img"
              style={{
                width: '100%',
                display: 'block',
                borderRadius: '10px',
              }}
            />
          ))
        }
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonaryImagesGallery;
