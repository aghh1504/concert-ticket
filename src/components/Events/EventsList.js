import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
//import styles from './styles.scss';
import '../../App.css';

class EventsList extends Component {

  render() {
    const {events} = this.props;
    const filterEvents =  events.reduce((result, item) => {
      if((result.filter(element  => element.name === item.name)).length === 0) {
        result.push(item);
      }
      return result;
    }, []);

    return (
      <div className='container'>
        <ul className="c-list">
           {filterEvents.map(item => {
               return (
                   <li className="c-list__item" key={item.id}>
                           <div className="c-list__block">
                               <div className='c-list__image__container'>
                                  <img alt={item.name} className="c-list__image" src={item.images[0].url}/>
                              </div>
                            <div className='c-list__description'>
                              <h4 className="c-list__title">{item.name}</h4>
                              <p>Dates: {item.dates.start.localDate}</p>
                              <p>Time: {item.dates.start.localTime}</p>
                              <p>Place: {item._embedded.venues[0].name} {item._embedded.venues[0].address.line1}, {item._embedded.venues[0].city.name}</p>
                            </div>
                              <div className='c-list__button'>
                                <button className='c-list__button__buy__ticket'><a target="_blank" href={item.url}>Buy ticket</a></button>
                                <Link to={`/events/${item.id}`}>
                                  <button className='c-list__button__see__more'>See more</button>
                                </Link>
                             </div>
                           </div>
                   </li>
               )
           })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.fetchListOfEvent.items
});

export default connect(mapStateToProps)(EventsList);
