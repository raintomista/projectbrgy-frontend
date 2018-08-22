import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';
import { Link } from "react-router-dom";

import './Stats.less';

const BarangayPostStats = (props) => {
  return (
    <div className="post-stats">
      <div className="post-stats-left">
        {props.statsLikes > 0 && (
          <Link to='/' className="post-likes-count">
            {props.statsLikes === 1 ? `${props.statsLikes} Like` : `${props.statsLikes} Likes`}
          </Link>
        )}

      </div>
      <div className="post-stats-right">
        {props.statsComments > 0 && (
          <a className="post-comments-count" onClick={props.handleToggleComments}>
            {props.statsComments === 1 ? `${props.statsComments} Comment` : `${props.statsComments} Comments`}
          </a>
        )}
        {props.statsShares > 0 && (
          <Link to='/' className="post-shares-count">
            {props.statsShares === 1 ? `${props.statsShares} Share` : `${props.statsShares} Share`}
          </Link>
        )}
      </div>
    </div>
  );
}

BarangayPostStats.propTypes = {
  handleToggleComments: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  statsComments: PropTypes.number.isRequired,
  statsLikes: PropTypes.number.isRequired,
  statsShares: PropTypes.number.isRequired,
}

export default BarangayPostStats;