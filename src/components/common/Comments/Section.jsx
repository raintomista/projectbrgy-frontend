import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Utilities
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

// Subcomponents
import CommentBox from './subcomponents/FieldBox';
import CommentItem from './subcomponents/Item';
import ViewMoreComment from './subcomponents/ViewMore';

// Services
import { deleteComment, getCommentsByPostId } from 'services/CommentService';

// Stylesheet
import './Section.less';

@observer
export default class CommentSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentPage: 1,
      totalPage: Math.ceil(props.totalComments / props.fetchLimit)
    }
  }

  render() {
    const comments = this._createCommentList(this.props.comments);
    const newComments = this._createCommentList(this.props.newComments);

    return (
      <div className="comment-section">
        <CommentBox
          handleEnter={(e) => this._handleEnter(e)}
          field={this.props.form.select('commentMessage')}
        />
        <div className="comments">
          {/* All comments from the server when the component mounted */}
          {newComments}          
          {comments}
          <ViewMoreComment
            currentPage={this.state.currentPage}
            totalPage={this.state.totalPage}
            handleLoadNextComments={() => this._handleLoadNextComments(this.props.postId)}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ updated: 1 });
    }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _createCommentList(commentArray) {
    return commentArray.map((comment, index) => (
      <CommentItem
        key={comment.comment_id}

        // Barangay Page Credentials
        brgyId={comment.barangay_page_id}
        brgyName={comment.barangay_page_name}

        // Comment Message
        commentId={comment.comment_id}
        commentMessage={comment.comment_message}

        formattedCreatedDate={this.props.handleFormatDate(comment.comment_date_created)}
        
        loggedUser={this.props.loggedUser}

        // Barangay Member Credentials
        userId={comment.user_id}
        userFirstName={comment.user_first_name}
        userLastName={comment.user_last_name}
        userRole={comment.user_role}

        // For handling logic in subcomponents
        handleDeleteComment={() => this._handleDeleteComment(comment.comment_id, this.props.postId)}
        handleViewBrgyPage={this._handleViewBrgyPage(comment.barangay_page_id)}
        handleViewUserProfile={this._handleViewUserProfile(comment.user_id)}
      />
    ));
  }

  async _handleDeleteComment(commentId, postId) {
    try {
      await deleteComment(commentId);

      // Reload comment section to first page when a comment is deleted
      const statsComments = this.props.form.select('statsComments').value;
      const response = await getCommentsByPostId(postId, 1, this.props.fetchLimit);
      const comments = response.data.data.items;

      // Recalculate total page of the comment section
      let totalPage = response.data.data.total;
      totalPage = Math.ceil((totalPage / this.props.fetchLimit));

      // Set the state of the currentPage and total Page
      this.setState({ currentPage: 1, totalPage: totalPage });
      
      this.props.form.select('comments').set('value', comments); //Replace the comment section with the fetched first 4 (since fetchlimit is 4) comments
      this.props.form.select('newComments').set('value', []); // The value of the new comments will be resetted to empty since the comment is resetted to the first 4 comments
      this.props.form.select('statsComments').set('value', statsComments - 1); // Decrement stats when a comment is deleted
    }
    catch (e) {
      console.log(e);
    }
  }

  _handleEnter(e){
    if(e.key === 'Enter') {
      this.props.form.onSubmit(e);
    }
  }

  async _handleLoadNextComments(postId) {
    if (this.state.currentPage < this.state.totalPage) {
      try {
        const response = await getCommentsByPostId(postId, this.state.currentPage + 1, this.props.fetchLimit);
        const fetchedComments = response.data.data.items;

        // Set new current page
        this.setState((prevState) => ({
          currentPage: prevState.currentPage + 1
        }));

        // Get existing comments
        let comments = this.props.form.select('comments').value;

        // Add fetched comment to the end of the array
        comments.push(...fetchedComments);

        // Update the comments array in comment form
        this.props.form.select('comments').set('value', comments);
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  _handleViewBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    }
  }

  _handleViewUserProfile(userId) {
    return {
      pathname: '/profile',
      search: `?id=${userId}`
    }
  }
}

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  fetchLimit: PropTypes.number.isRequired,
  handleFormatDate: PropTypes.func.isRequired,
  newComments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired
}
