import React, { useMemo } from 'react'
import { API_ENDPOINTS } from '../../utils/app-constant';

const Card = ({ title, image }) => {

  const getImageUrl = useMemo(() => {
    return API_ENDPOINTS.addQueryParamInUrl(API_ENDPOINTS.MOVIE_POSTER_IMAGE_BASE_URL, {
      imageName: image,
    });
  }, [image]);
  
  return (
    <div className="card">
      <div className="image-container">
        <img
          src={getImageUrl}
          onError={(e) => {
            e.target.src = API_ENDPOINTS.DEFAULT_IMAGE;
          }}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="title" data-title={title}>
        {title}
      </div>
    </div>
  );
};

export default Card