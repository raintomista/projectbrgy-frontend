import React from 'react';
import PropTypes from 'prop-types';

import SharedPost from './SharedPost';

import './Content.less';

const BarangayPostContent = (props) => {
  return (
    <div className="post-content">

      {props.postMessage && (
        <div className="post-message">
          {props.postMessage}
        </div>
      )}

      {props.postType === 'sharePost' && (
        <SharedPost
          sharedPostId={props.sharedPostId}
          sharedPostAuthor={props.sharedPostAuthor}
          sharedPostAuthorId={props.sharedPostAuthorId}
          sharedPostAuthorImg={props.sharedPostAuthorImg}
          sharedPostDate={props.sharedPostDate}
          sharedPostLocation={props.sharedPostLocation}
          sharedPostMessage={props.sharedPostMessage}
        />
      )}
    </div>
  )
}

BarangayPostContent.propTypes = {
  postMessage: PropTypes.string,
  postType: PropTypes.oneOf(['announcement', 'sharePost']).isRequired,
  sharedPostId: PropTypes.string,
  sharedPostAuthor: PropTypes.string,
  sharedPostAuthorId: PropTypes.string,
  sharedPostAuthorImg: PropTypes.string,
  sharedPostDate: PropTypes.string,
  sharedPostLocation: PropTypes.string,
  sharedPostMessage: PropTypes.string,
}

export default BarangayPostContent;