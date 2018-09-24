import React from 'react';
import './ImageContent.less';

const ImageContent = (props) => {
  if (props.attachments.length === 1) {
    return (
      <div className="single-image-content">
        <img src={getRawURL(props.attachments[0].link)} />
      </div>
    );
  } else {
    return <div></div>
  }
}

function getRawURL(link) {
  return link.replace('dl=0', 'raw=1');
}

export default ImageContent;