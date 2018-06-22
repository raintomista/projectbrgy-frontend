import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';


const NewsFeedOptions = (props) => (
  <div className="newsfeed-option">
    <h6 className="title">News Feed</h6>
    <label className="dropdown-label">Sort by</label>
    <a className="btn">
      <FontAwesomeIcon icon={faChevronDown} />
    </a>
  </div>
);

export default NewsFeedOptions;