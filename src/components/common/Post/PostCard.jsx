import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Utilities
import Moment from 'moment';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';

// Subcomponents 
import BarangayPostDetails from './subcomponents/Details';
import BarangayPostContent from './subcomponents/Content';
import BarangayPostStats from './subcomponents/Stats';
import BarangayPostActionButtons from './subcomponents/ActionButtons';
import CommentSection from 'components/common/Comments/Section';
import { fields, hooks, plugins } from 'components/common/Comments/subcomponents/Form';

// Services 
import { getCommentsByPostId } from 'services/CommentService';
import { likePost, unlikePost } from 'services/PostService';

// Stylesheet
import './PostCard.less';

@observer
export default class BarangayPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentSectionVisible: false,
      isPostOptionsOpen: false,
      isLiked: props.isLiked,
      statsComments: props.statsComments,
      statsLikes: props.statsLikes,
      statsShares: props.statsShares,
      comments: [],
      totalComments: 0,
      fetchLimit: 4,
    }

    // Initialize comment form
    this.form = new MobxReactForm({ fields }, { plugins, hooks });
    this.form.select('postId').set('value', this.props.postId);
    this.form.select('comments').set('value', this.state.comments);
    this.form.select('statsComments').set('value', this.state.statsComments);
  }

  render() {
    return (
      <div className="brgy-post card">
        <div className="card-body">
          <BarangayPostDetails
            authorId={this.props.authorId}
            authorImg={this.props.authorImg}
            authorName={this.props.authorName}
            authorLocation={this.props.authorLocation}
            handleDeletePost={this.props.handleDeletePost}
            handleTogglePostOptions={() => this._handleTogglePostOptions()}
            isPostOptionsOpen={this.state.isPostOptionsOpen}
            loggedUser={this.props.loggedUser}
            postId={this.props.postId}
            postBrgyId={this.props.postBrgyId}
            postDate={this._handleFormatDate(this.props.postDate)}
            postType={this.props.postType}
          />
          <BarangayPostContent postMessage={this.props.postMessage} />
          <BarangayPostStats
            handleToggleComments={() => this._handleToggleComments(1)}
            postId={this.props.postId}
            statsLikes={this.state.statsLikes}
            statsComments={this.form.select('statsComments').value}
            statsShares={this.state.statsShares}
          />
          <BarangayPostActionButtons
            isLiked={this.state.isLiked}
            handleLikePost={() => this._handleLikePost()}
            handleUnlikePost={() => this._handleUnlikePost()}
            handleToggleComments={() => this._handleToggleComments(1)}
          />
          {this.state.isCommentSectionVisible && (
            <CommentSection
              comments={this.form.select('comments').value}
              form={this.form}
              fetchLimit={this.state.fetchLimit}
              loggedUser={this.props.loggedUser}
              handleFormatDate={(date) => this._handleFormatDate(date)}
              newComments={this.form.select('newComments').value}
              postId={this.props.postId}
              totalComments={this.state.totalComments}
            />
          )}
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

  _handleEnter(e) {
    if (e.key === 'Enter') {
      this.form.onSubmit(e);
    }
  }

  _handleFormatDate(date) {
    const currentDate = Moment();
    const diffInSeconds = parseInt(Moment(date).diff(currentDate, 'seconds'), 10);
    const diffInHours = parseInt(Moment(date).diff(currentDate, 'hours'), 10);

    if (diffInHours <= -21) {
      return Moment(date).format('MMM D, YYYY [at] h:mm a');
    }
    else if (diffInHours > -21 && (diffInSeconds < -60 || diffInSeconds > -10)) {
      return Moment(date).fromNow();
    }
    else if (diffInHours > -21 && diffInSeconds <= -10) {
      return `${Math.abs(diffInSeconds)} seconds ago`;
    }
  }

  async _handleLikePost() {
    try {
      await likePost(this.props.postId);
      this.setState((prevState) => ({
        isLiked: 1,
        statsLikes: prevState.statsLikes + 1
      }));
    }
    catch (e) {
      console.log(e)
    }
  }

  async _handleUnlikePost() {
    try {
      await unlikePost(this.props.postId);
      this.setState((prevState) => ({
        isLiked: 0,
        statsLikes: prevState.statsLikes - 1
      }));
    }
    catch (e) {
      console.log(e)
    }
  }

  async _handleToggleComments(currentPage) {
    if (!this.state.isCommentSectionVisible) {
      try {
        const response = await getCommentsByPostId(this.props.postId, currentPage, this.state.fetchLimit);
        this.setState((prevState) => ({
          isCommentSectionVisible: true,
          comments: response.data.data.items,
          totalComments: response.data.data.total
        }));

        this.form.select('comments').set('value', this.state.comments);
      }
      catch (e) {
        this.setState((prevState) => ({
          isCommentSectionVisible: true
        }));
      }
    }
  }

  _handleTogglePostOptions() {
    this.setState((prevState) => ({
      isPostOptionsOpen: !prevState.isPostOptionsOpen,
    }))
  }
}

BarangayPost.propTypes = {
  authorId: PropTypes.string.isRequired,
  authorImg: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorLocation: PropTypes.string.isRequired,
  contentType: PropTypes.oneOf(['image', 'attachment']),
  isLiked: PropTypes.oneOf([0, 1]).isRequired,
  loggedUser: PropTypes.object,
  postId: PropTypes.string.isRequired,
  postBrgyId: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  postMessage: PropTypes.string.isRequired,
  postType: PropTypes.oneOf(['announcement', 'sharePost']).isRequired,
  statsComments: PropTypes.number.isRequired,
  statsLikes: PropTypes.number.isRequired,
  statsShares: PropTypes.number.isRequired,
}
