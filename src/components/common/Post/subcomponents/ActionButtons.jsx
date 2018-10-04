import React from 'react';
import PropTypes from 'prop-types';
import './ActionButtons.less';

const ActionButtons = (props) => {
  return (
    <div>
      {!props.disableInteractions && (
        <div className="post-action-buttons">
          {/* Display if post is liked or not */}
          {props.isLiked === 0 ?
            <a onClick={props.handleLikePost} className="btn">Like</a> :
            <a onClick={props.handleUnlikePost} className="btn liked">Liked</a>
          }

          <a className="btn" onClick={props.handleToggleComments}>Comment</a>
          <a onClick={props.handleSharePost} className="btn">Share</a> 
        </div>
      )}

      {props.disableInteractions && (
        <div className="post-action-buttons">
          <a className="disabled btn">Like</a>
          <a className="disabled btn">Comment</a>
          {/* <a className="disabled btn">Share</a> */}
        </div>
      )}
    </div>
  );
}

ActionButtons.propTypes = {
  disableInteractions: PropTypes.bool,
  isLiked: PropTypes.oneOf([0, 1]).isRequired,
  handleLikePost: PropTypes.func.isRequired,
  handleUnlikePost: PropTypes.func.isRequired,
  handleToggleComments: PropTypes.func.isRequired,
  handleSharePost: PropTypes.func.isRequired
}

export default ActionButtons;