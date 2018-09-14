import React from 'react';
import './ButtonLoader.less';

const ButtonLoader = (props) => (
  <button className="button-loader" onClick={props.handleClick}>
    { props.loading && 'Loading...'}
    { !props.loading && 'Show more'}    
  </button>
);

export default ButtonLoader;