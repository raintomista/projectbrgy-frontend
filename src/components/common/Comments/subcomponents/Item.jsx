import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const CommentItem = (props) => (
  <div className="comment" key={props.commentId}>

    {/* Comment Item Avatar */}
    <div className="comment-avatar">

      {/*-------- Barangay Member Default Avatar  ------- */}
      {props.userRole === 'barangay_member' && (
        <Link to={props.handleViewUserProfile} >
          <img src="images/default-user.png " alt="" />
        </Link>
      )}

      {/*-------- Barangay Page Admin Default Avatar  ------- */}
      {props.userRole === 'barangay_page_admin' && (
        <Link to={props.handleViewBrgyPage} >
          <img src="images/default-brgy.png " alt="" />
        </Link>
      )}
    </div>

    {/* Comment Item Content */}
    <div className="comment-content">

      {/*-------- Barangay Member Comment  ------- */}
      {props.userRole === 'barangay_member' && (
        <p className="comment-message">
          <Link to={props.handleViewUserProfile} className="comment-author">
            {`${props.userFirstName} ${props.userLastName}`}
          </Link>
          {props.commentMessage}
        </p>
      )}

      {/*-------- Barangay Page Comment  ------- */}
      {props.userRole === 'barangay_page_admin' && (
        <p className="comment-message">
          <Link to={props.handleViewBrgyPage} className="comment-author">
            {props.brgyName}
          </Link>
          {props.commentMessage}
        </p>
      )}

      {/*-------- Comment Details  ------- */}
      <div className="comment-details">
        <span className="comment-date-created">{props.formattedCreatedDate} </span>

        {/* Barangay member has the ability to delete its own comments  */}
        {props.userRole === 'barangay_member' && props.userId === props.loggedUser.user_id && (
          <span> &middot; <a onClick={props.handleDeleteComment}>Delete</a></span>
        )}

        {/* Barangay page admin has the ability to delete all comments made by itself and other admin for their own barangay page' comments*/}
        {props.userRole === 'barangay_page_admin' && props.commentBrgyId === props.loggedUser.barangay_page_id && (
          <span> &middot; <a onClick={props.handleDeleteComment}>Delete</a></span>
        )}
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  brgyName: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  commentBrgyId: PropTypes.string,  
  commentMessage: PropTypes.string.isRequired,
  formattedCreatedDate: PropTypes.string.isRequired,
  loggedUser: PropTypes.object,
  userId: PropTypes.string.isRequired,
  userFirstName: PropTypes.string.isRequired,
  userLastName: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  handleViewBrgyPage: PropTypes.object.isRequired,
  handleViewUserProfile: PropTypes.object.isRequired,
}

export default CommentItem;