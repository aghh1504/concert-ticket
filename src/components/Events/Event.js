import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';


const Event = ({item, addToWishlist}) => {
    return (
           <li className="c-list__item" key={item.id}>
               <div className="c-list__block">
                   <div className='c-list__image__container'>
                      <img alt={item.name} className="c-list__image" src={item.images[0].url}/>
                  </div>
                <div className='c-list__description'>
                  <h4 className="c-list__title">{item.name}</h4>
                  <p>Date: {item.dates.start.localDate}</p>
                  <p>Time: {item.dates.start.localTime}</p>
                  <p>Place: {item._embedded.venues[0].name} {item._embedded.venues[0].address.line1}, {item._embedded.venues[0].city.name}</p>
                </div>
                  <div className='c-list__button'>
                    <button className='c-list__button__buy__ticket'><a target="_blank" href={item.url}>Buy ticket</a></button>
                    <Link to={`/events/${item.id}`}>
                      <button className='c-list__button__see__more'>See more</button>
                    </Link>
                    <button className='c-list__button__wishlist' onClick={() => addToWishlist(item)}>Wishlist</button>
                 </div>
               </div>
           </li>
    );
}

export default Event;
