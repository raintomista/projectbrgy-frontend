import React from 'react';
import PropTypes from 'prop-types';

import './Content.less';

const BarangayPostContent = (props) => {
  return (
    <div className="post-content">
      <div className="post-message">
        {props.postMessage}
      </div>
    </div>
  )
}

BarangayPostContent.propTypes = {
  postMessage: PropTypes.string
}

export default BarangayPostContent;