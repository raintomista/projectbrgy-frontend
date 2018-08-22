import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './Details.less';

const BarangayPostDetails = observer((props) => {
  return (
    <div className="post-details-container">
      <Link to={viewBrgyPage(props.authorId)} className="post-author-avatar">
        <img src={props.authorImg} alt="" />
      </Link>

      {/* Post Details */}
      <div className="post-details">

        {/* Post Author */}
        <div className="post-author-container">
          <Link to={viewBrgyPage(props.authorId)} className="post-author">
            {props.authorName}
          </Link>

          {/* [author] shared a post */}
          {props.postType === 'sharePost' && (
            <div className="share-post-details">
              <span> shared a </span>
              <Link to={viewPost(props.sharedPostId)} className="post-link">post</Link>
            </div>
          )}
        </div>

        {/* Post Location and Timestamp */}
        <div className="post-subdetails">
          <Link to='/dashboard' className="post-location">{props.authorLocation}</Link>
          <span> &middot; </span>
          <Link to={viewPost(props.postId)} className="post-timestamp">{formatDate(props.postDate)}</Link>
        </div>
      </div>
      
      {/* Post Options */}
      <div className="post-options">
        <Dropdown isOpen={props.isPostOptionsOpen} toggle={props.handleTogglePostOptions}>
          <DropdownToggle><FontAwesomeIcon icon={faChevronDown} /></DropdownToggle>
          <DropdownMenu>
            <Link to={viewPost(props.postId)}>
              <DropdownItem>View Post</DropdownItem>
            </Link>
            <DropdownItem onClick={props.handleDeletePost}>Delete Post</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
});

BarangayPostDetails.propTypes = {
  authorId: PropTypes.string.isRequired,
  authorImg: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorLocation: PropTypes.string.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleTogglePostOptions: PropTypes.func.isRequired,
  isPostOptionsOpen: PropTypes.bool.isRequired,
  loggedUser: PropTypes.object,
  postId: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  postType: PropTypes.oneOf(['announcement', 'sharePost']).isRequired,
  sharedPostId: PropTypes.string,
}

export default BarangayPostDetails;


/*---------- Utility Functions ----------*/
function formatDate(date) {
  const currentDate = Moment();
  const diffInSeconds = parseInt(Moment(date).diff(currentDate, 'seconds'), 10);
  const diffInHours = parseInt(Moment(date).diff(currentDate, 'hours'), 10);

  if (diffInHours <= -21) {
    return Moment(date).format('MMM D, YYYY [at] h:mm a');
  }
  else if (diffInHours > -21 && (diffInSeconds < -60 || diffInSeconds > -10)) {
    return Moment(date).fromNow();
  }
  else if (diffInHours > -21 && diffInSeconds <= -10) {
    return `${Math.abs(diffInSeconds)} seconds ago`;
  }
}

function viewBrgyPage(brgyId) {
  return {
    pathname: '/barangay',
    search: `?id=${brgyId}`
  }
}

function viewPost(postId) {
  return {
    pathname: 'post',
    search: `?id=${postId}`
  }
}

