import React from 'react';
import './ButtonLoader.less';

const ButtonLoader = (props) => (
  <button className="button-loader" onClick={props.handleClick} disabled={props.loading}>
    { props.loading && 'Loading...'}
    { !props.loading && 'Show more'}    
  </button>
);

export default ButtonLoader;