import React from 'react';
import { Link } from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown'
import Moment from 'moment';

const formatDate = (date) => {
  const diff = Moment(date).diff(Moment(), 'hours');

  if(parseInt(diff, 10) <=-21){    
    return Moment(date).format('MMM D, YYYY [at] h:mm a');
  } else {
    return Moment(date).fromNow();
  }
}


const DashboardFeedCard = (props) => (
  <div className="feed-post card">
    <div className="card-body">
      <div className="post-info-group">
        <img src={props.imgSrc} className="post-avatar" alt="" />
        <div className="post-info">
          <Link to='/dashboard' className="post-author">{props.authorName}</Link>
          <Link to='/dashboard' className="post-location">{props.city}</Link>
          <Link to='/dashboard' className="post-timestamp">{formatDate(props.date)}</Link>
        </div>
        <div className="more">
        <Link to='/dashboard' className="btn"><FontAwesomeIcon icon={faChevronDown} /></Link>
          <a className="btn">
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </div>
      <div className="post-content">
        <div className="embedded-link">
          <div className="preview-content">
            <div className="preview-img">
              <img src="images/embedded-link-default.png" alt="" />
            </div>
            <div className="preview-details">
              <h6 className="link-title">56th founding anniversary of Caloocan City</h6>
              <div className="link-subdetails">
                <span className="link-author">Manila Bulletin</span>
                <span className="separator"> - </span>
                <span className="link-timestamp">15 Feb 2018</span>
              </div>
              <p className="link-text">Caloocan celebrates its 56th founding anniversary today, 16 February 2018, pursuant to Proclamation
                No. 9 series.. Barangay Bagong Silang is the most populous barangay in the entire Philippines,
                with 246,515 residents... A Mega-job Fair will be held on February 20 at the Main City Hall. Finally...</p>
            </div>
          </div>
        </div>
      </div>
      <div className="post-buttons">
        <Link to='/dashboard' className="btn">Like</Link>
        <Link to='/dashboard' className="btn">Comment</Link>
        <Link to='/dashboard' className="btn">Share</Link>
      </div>
    </div>
  </div>
);



export default DashboardFeedCard;