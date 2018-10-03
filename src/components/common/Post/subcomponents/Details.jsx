import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';
import { Link } from "react-router-dom";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './Details.less';

const BarangayPostDetails = observer((props) => {
  return (
    <div className="post-details-container">
      {props.authorRole === 'barangay_page_admin' && (
        <Link to={viewBrgyPage(props.authorId)} className="post-author-avatar">
          <img src={props.authorImg} alt="" />
        </Link>
      )}

      {props.authorRole === 'barangay_member' && (
        <Link to={viewUserProfile(props.authorId)} className="post-author-avatar">
          <img src={props.authorImg} alt="" />
        </Link>
      )}


      {/* Post Details */}
      <div className="post-details">

        {/* Post Author */}
        <div className="post-author-container">

          {props.authorRole === 'barangay_page_admin' && (
            <Link to={viewBrgyPage(props.authorId)} className="post-author">
              {props.authorName}
            </Link>
          )}

          {props.authorRole === 'barangay_member' && (
            <Link to={viewUserProfile(props.authorId)} className="post-author">
              {props.authorName}
            </Link>
          )}

          {/* [author] shared a post */}
          {props.postType === 'sharePost' && (
            <div className="share-post-details">
              <span> shared an </span>
              <Link to={viewPost(props.sharedPostId, 'announcement')} className="post-link">announcement</Link>
              <span>.</span>
            </div>
          )}
        </div>

        {/* Post Location and Timestamp */}
        <div className="post-subdetails">
          <a className="post-location">{props.authorLocation}</a>
          <span> &middot; </span>
          <Link to={viewPost(props.postId, props.postType)} className="post-timestamp">
            {props.postDate}
          </Link>
        </div>
      </div>

      {/* Post Options */}
      <div className="post-options">
        <Dropdown isOpen={props.isPostOptionsOpen} toggle={props.handleTogglePostOptions}>
          <DropdownToggle><FontAwesomeIcon icon={faChevronDown} /></DropdownToggle>
          <DropdownMenu>
            <Link to={viewPost(props.postId, props.postType)}>
              <DropdownItem>View Post</DropdownItem>
            </Link>

            {props.authorRole === 'barangay_page_admin' && props.loggedUser !== null && props.loggedUser.user_role === 'barangay_page_admin' && props.loggedUser.user_barangay_id === props.postBrgyId && (
              <DropdownItem onClick={props.handleDeletePost}>Delete Post</DropdownItem>
            )}

            {props.authorRole === 'barangay_member' && props.loggedUser.user_id === props.authorId && (
              <DropdownItem onClick={props.handleDeletePost}>Delete Post</DropdownItem>
            )}
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
  authorRole: PropTypes.string,
  authorLocation: PropTypes.string.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleTogglePostOptions: PropTypes.func.isRequired,
  isPostOptionsOpen: PropTypes.bool.isRequired,
  loggedUser: PropTypes.object,
  postId: PropTypes.string.isRequired,
  postBrgyId: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  postType: PropTypes.oneOf(['announcement', 'sharePost']).isRequired,
  sharedPostId: PropTypes.string,
  sharedPostAuthorId: PropTypes.string,
}

export default BarangayPostDetails;


function viewBrgyPage(brgyId) {
  return {
    pathname: '/barangay',
    search: `?id=${brgyId}`
  }
}

function viewPost(postId, postType) {
  return {
    pathname: 'post',
    search: `?id=${postId}&type=${postType}`
  }
}

function viewUserProfile(userId) {
  return {
    pathname: '/profile',
    search: `?id=${userId}`
  }
}

