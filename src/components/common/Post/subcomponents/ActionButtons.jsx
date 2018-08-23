import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import './ActionButtons.less';

const ActionButtons = (props) => {
  return (
    <div className="post-action-buttons">

      {/* When post is not liked button */}
      {props.isLiked === 0 && (
        <a onClick={props.handleLikePost} className="btn">Like</a>
      )}

      {/* When post is liked button */}
      {props.isLiked === 1 && (
        <a onClick={props.handleUnlikePost} className="btn liked">Liked</a>
      )}

      <a className="btn" onClick={props.handleToggleComments}>Comment</a>

      <Link to='/dashboard' className="btn">Share</Link>
    </div>
  );
}

ActionButtons.propTypes = {
  isLiked: PropTypes.oneOf([0, 1]).isRequired,
  handleLikePost: PropTypes.func.isRequired,
  handleUnlikePost: PropTypes.func.isRequired,
  handleToggleComments: PropTypes.func.isRequired
}

export default ActionButtons;