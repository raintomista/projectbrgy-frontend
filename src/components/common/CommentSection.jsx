import React, { Component } from 'react';
import 'components/common/CommentSection.less';

/*--------------- Form ---------------*/
import { fields, hooks, plugins } from 'forms/FormAddComment';

/*--------------- Utils ---------------*/
import Moment from 'moment';
import MobxReactForm from 'mobx-react-form';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { deleteComment, getCommentsByPostId } from 'services/CommentService';

@observer
export default class CommentSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.currentPage,
      totalPage: this.props.totalPage
    };

    // Comment section has own instance of the form
    this.form = new MobxReactForm({ fields }, { plugins, hooks });

    /*------------ Binding of Functions ----------- */
    this.handleKeyPress = this.handleKeyPress.bind(this);

    /*-------- Store Loaded Comments in Form  ------- */
    this.form.$('comments').set('value', this.props.comments);

  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ updated: 1 });
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { loggedUser, postId } = this.props;
    const { currentPage, totalPage } = this.state;

    let comments = [];

    this.form.select('comments').value.map((comment, index) => {
      const { barangay_page_id, barangay_page_name } = comment;
      const { comment_id, comment_date_created, comment_message } = comment;
      const { user_id, user_first_name, user_last_name, user_role } = comment;

      /*-------- Comments of a Post ------- */
      comments.push(
        <div className="comment" key={comment_id}>
          <div className="comment-avatar">

            {/* TODO: Fix remove user issues */}
            {/*-------- Barangay Member Default Avatar  ------- */}
            {user_role === 'barangay_member' && (
              <Link to={this.viewUserProfile(user_id)} >
                <img src="images/default-user.png " alt="" />
              </Link>
            )}

            {/*-------- Barangay Page Admin Default Avatar  ------- */}
            {user_role === 'barangay_page_admin' && (
              <Link to={this.viewBrgyPage(barangay_page_id)} >
                <img src="images/default-brgy.png " alt="" />
              </Link>
            )}
          </div>
          <div className="comment-content">

            {/*-------- Barangay Member Comment  ------- */}
            {user_role === 'barangay_member' && (
              <p className="comment-message">
                <Link to={this.viewUserProfile(user_id)} className="comment-author">{`${user_first_name} ${user_last_name}`}</Link>
                {comment_message}
              </p>
            )}

            {/*-------- Barangay Page Comment  ------- */}
            {user_role === 'barangay_page_admin' && (
              <p className="comment-message">
                <Link to={this.viewBrgyPage(barangay_page_id)} className="comment-author">{barangay_page_name}</Link>
                {comment_message}
              </p>
            )}

            {/*-------- Barangay Member Comment  ------- */}
            <div className="comment-details">
              <span className="comment-date-created">{this.formatDate(comment_date_created)} </span>

              {user_id === loggedUser.user_id && (
                <span> &middot; <a onClick={() => this.deleteMyComment(comment_id, index)}>Delete</a></span>
              )}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="comment-section">
        <div className="comments">

          {/*------------------ Hide if the page reaches the total page ------------------*/}
          {currentPage !== totalPage && (
            <div className="view-more-comments">
              <a onClick={() => this.loadPreviousComments(postId)}>View previous comments</a>
              <span className="paginator">{currentPage} of {totalPage}</span>
            </div>
          )}

          {/*-- Render Comments of a Post --*/}
          {comments}
        </div>
        <div className="comment-box">
          <input
            type="text"
            className="form-control"
            onKeyPress={this.handleKeyPress}
            {...this.form.$('message').bind()}
          />
        </div>
      </div>
    );
  }

  async deleteMyComment(commentId, index) {
    //TODO: Fix issues with deleting
    try {
      const response = await deleteComment(commentId);

      // Get existing comments
      let comments = this.form.select('comments').value;

      // Remove selected comment
      comments.splice(index, 1);

      // Update array in form
      this.form.select('comments').set('value', comments);
    }
    catch (e) {
      console.log(e);
    }
  }

  async loadPreviousComments(postId) {
    const { currentPage, totalPage } = this.state;

    if (currentPage < totalPage) {
      const newCurrentPage = currentPage + 1;
      const response = await getCommentsByPostId(postId, newCurrentPage, 3);

      // Set new current page
      this.setState({ currentPage: newCurrentPage });


      // Get existing comments
      let comments = this.form.select('comments').value;

      // Add fetched comment to the head of the array
      comments.unshift(...response.data.data.items);


      // Update the comment array in forms
      this.form.select('comments').set('value', comments);
    }
  }

  formatDate(date) {
    const currentDate = Moment();
    const diff = Moment(date).diff(currentDate, 'hours');

    if (parseInt(diff, 10) <= -21) {
      return Moment(date).format('MMM D, YYYY [at] h:mm a');
    } else {
      return Moment(date).fromNow();
    }
  }

  handleKeyPress(e) {
    //TODO: Fix issues with adding comment

    if (e.key === 'Enter') {
      this.form.select('postId').set('value', this.props.postId);
      this.form.onSubmit(e, 'test');
    }
  }

  viewBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    }
  }

  viewUserProfile(userId) {
    return {
      pathname: '/profile',
      search: `?id=${userId}`
    }
  }
}
