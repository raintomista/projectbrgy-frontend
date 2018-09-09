import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import './SharedPost.less';

const SharedPost = (props) => (
  <React.Fragment>
    <div className="shared-post-container">
      <Link to={viewBrgyPage(props.sharedPostAuthorId)} className="shared-post-author-avatar">
        <img src={props.sharedPostAuthorImg} alt="" />
      </Link>

      <div className="shared-post">
        <Link to={viewBrgyPage(props.sharedPostAuthorId)} className="shared-post-author">
          {props.sharedPostAuthor}
        </Link>
        <div className="shared-post-subdetails">
          <Link to='/dashboard' className="shared-post-location">{props.sharedPostLocation}</Link>
          <span> &middot; </span>
          <Link
            to={viewPost(props.sharedPostId, 'announcement')}
            className="shared-post-timestamp"
          >
            {props.sharedPostDate}
          </Link>
        </div>

        <div className="shared-post-content">
          {props.sharedPostMessage}
        </div>
      </div>
    </div>
  </React.Fragment>
)

SharedPost.propTypes = {
  sharedPostId: PropTypes.string,
  sharedPostAuthor: PropTypes.string,
  sharedPostAuthorId: PropTypes.string,
  sharedPostAuthorImg: PropTypes.string,
  sharedPostDate: PropTypes.string,
  sharedPostLocation: PropTypes.string,
  sharedPostMessage: PropTypes.string,
}

export default SharedPost;

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