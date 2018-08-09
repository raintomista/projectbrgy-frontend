import React from 'react';
import 'components/common/CommentSection.less';

/*--------------- Form ---------------*/
import form from 'forms/FormAddComment';

export default function CommentSection(props) {
  const { postId } = props;

  return (
    <div className="comment-section">
      <div className="comments">
        <div className="view-more-comments">
          <a href="">View previous comments</a>
          <span className="paginator">1 of 67</span>
        </div>
        <div className="comment">
          <div className="comment-avatar">
            <img src="images/default-brgy.png " alt="" />
          </div>
          <div className="comment-content">
            <p className="comment-message">
              <span className="comment-author">Cardo Dalisay</span> Every company wants
            </p>
            <div className="comment-date-created">1s</div>
          </div>
        </div>
        <div className="comment">
          <div className="comment-avatar">
            <img src="images/default-brgy.png " alt="" />
          </div>
          <div className="comment-content">
            <p className="comment-message">
              <span className="comment-author">Cardo Dalisay</span> Every company wants
            </p>
            <div className="comment-date-created">1s</div>
          </div>
        </div>
      </div>
      <form className="comment-box" onSubmit={form.onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Write a comment..."
          {...form.$('message').bind()}
        />
      </form>
    </div>
  );
} ``