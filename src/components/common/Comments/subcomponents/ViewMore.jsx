import React from 'react';
import PropTypes from 'prop-types';

const ViewMore = (props) => (
  <div>
    {props.currentPage < props.totalPage && (
      <div className="view-more-comments">
        <a onClick={props.handleLoadNextComments}>View next comments</a>
        <span className="paginator">{props.currentPage} of {props.totalPage}</span>
      </div>
    )}
  </div>
);

ViewMore.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handleLoadNextComments: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
}

export default ViewMore;