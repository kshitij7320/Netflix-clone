import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=YOUR_API_KEY&language=en-US`)
      .then(res => res.json())
      .then(res => {
        // Choose the first video with type "Trailer" or just the first video available
        const video = res.results ? res.results.find(v => v.type === "Trailer") || res.results : null;
        setApiData(video);
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className='player'>
      <img 
        src={back_arrow_icon} 
        alt="Back" 
        onClick={() => navigate(-1)} 
        style={{cursor: 'pointer'}}
      />
      {apiData && apiData.key ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title={apiData.name}
          frameBorder='0'
          allowFullScreen
        />
      ) : (
        <p>Loading trailer...</p>
      )}
      {apiData && (
        <div className="player-info">
          <p>{apiData.published_at}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      )}
    </div>
  );
}

export default Player;
