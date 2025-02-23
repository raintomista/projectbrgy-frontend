import React from 'react';
import PropTypes from 'prop-types';

import SharedPost from './SharedPost';
import FileContent from './FileContent';
import ImageContent from './ImageContent';

import './Content.less';

const BarangayPostContent = (props) => {
  const isPhoto = props.attachments.every((attachment) => attachment.preview_type === 'photo');
  return (
    <div className="post-content">

      {props.postType === 'announcement' && (
        <React.Fragment>
          {props.postMessage && (
            <div className="post-message">
              {props.postMessage}
            </div>
          )}
          {isPhoto && props.attachments.length > 0 && <ImageContent attachments={props.attachments} className="single-image-content" />}
          {!isPhoto && props.attachments.length > 0 && <FileContent attachments={props.attachments} />}
        </React.Fragment>
      )}

      {props.postType === 'sharePost' && (
        <React.Fragment>
          {props.postMessage && (
            <div className="post-message">
              {props.postMessage}
            </div>
          )}
          <SharedPost
            attachments={props.attachments}
            sharedPostId={props.sharedPostId}
            sharedPostAuthor={props.sharedPostAuthor}
            sharedPostAuthorId={props.sharedPostAuthorId}
            sharedPostAuthorImg={props.sharedPostAuthorImg}
            sharedPostDate={props.sharedPostDate}
            sharedPostLocation={props.sharedPostLocation}
            sharedPostMessage={props.sharedPostMessage}
          />
        </React.Fragment>
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