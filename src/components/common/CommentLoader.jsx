import React from 'react';

const CommentLoader = (props) => {
  const hidden = props.visible ? 'block' : 'none';
  const style = { textAlign: 'center', display: hidden, marginTop: '13px' };

  return (
    <div className="comment-loader" style={style}>
      <object data="images/loader.svg" type="image/svg+xml">
      </object>
    </div>
  );
}

export default CommentLoader;