import React from 'react';
import PropTypes from 'prop-types';
import FileContent from './FileContent';
import ImageContent from './ImageContent';
import { Link } from "react-router-dom";

import './SharedPost.less';

const SharedPost = (props) => {
  const isPhoto = props.attachments.every((attachment) => attachment.preview_type === 'photo');
  return (
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
            <a className="shared-post-location">{props.sharedPostLocation}</a>
            <span> &middot; </span>
            <Link
              to={viewPost(props.sharedPostId, 'announcement')}
              className="shared-post-timestamp"
            >
              {props.sharedPostDate}
            </Link>
          </div>

          <div className="shared-post-content">
            <span className="message">{props.sharedPostMessage}</span>
            {isPhoto && props.attachments.length > 0 && <ImageContent attachments={props.attachments} className="single-shared-image" />}
            {!isPhoto && props.attachments.length > 0 && <FileContent attachments={props.attachments} />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

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