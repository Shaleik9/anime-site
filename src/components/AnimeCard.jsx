import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function AnimeCard(props) {
  const { rec } = props;
  const [userId, setUserId] = useState('');

  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return undefined;
  }

  useEffect(() => {
    const id = getCookie("id");
    setUserId(id);
  });

  return (
    <>
      <div className="animeCard">
        <div className="animeCardHead">
          <Link to={`/anime-details/${props.rec.id}`} onClick={() => {
            props.handleCLick();
          }}>
            <img src={props.rec.image} 
            alt={props.rec.id}
            className="animeImage" />
          </Link>
          <div className="animeCardDetails">
            <div className="totalEpisodes">
              <span>{(props.rec.type)}</span>
              <span>{(props.rec.rating / 10)}</span>
            </div>
            {props?.rec?.title?.english && props?.rec?.title?.english ? (
              <h5 className="animeCardTitle">{props?.rec?.title?.english}</h5>
            ) : (
              <p className="animeCardTitle">{props?.rec?.title?.romaji}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
 
}