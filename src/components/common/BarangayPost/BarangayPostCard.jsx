import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';

// Subcomponents 
import BarangayPostDetails from './subcomponents/Details';
import BarangayPostContent from './subcomponents/Content';
import BarangayPostStats from './subcomponents/Stats';
import BarangayPostActionButtons from './subcomponents/ActionButtons';
import { fields, hooks, plugins } from './subcomponents/CommentForm';

// Services 
import { getCommentsByPostId } from 'services/CommentService';
import { likePost, unlikePost } from 'services/LikeService';

// Stylesheet
import './BarangayPostCard.less';

@observer
export default class BarangayPostCard extends Component {
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
    this.form.select('comments').set('value', this.state.comments);    
    this.form.select('postId').set('value', this.props.postId);    
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
            handleDeletePost={() => this._handleDeletePost()}
            handleTogglePostOptions={() => this._handleTogglePostOptions()}
            isPostOptionsOpen={this.state.isPostOptionsOpen}
            loggedUser={this.props.loggedUser}
            postId={this.props.postId}
            postDate={this.props.postDate}
            postType={this.props.postType}
          />
          <BarangayPostContent postMessage={this.props.postMessage} />
          <BarangayPostStats
            handleToggleComments={() => this._handleToggleComments()}
            postId={this.props.postId}
            statsLikes={this.state.statsLikes}
            statsComments={this.form.select('statsComments').value}
            statsShares={this.state.statsShares}
          />
          <BarangayPostActionButtons
            isLiked={this.state.isLiked}
            handleLikePost={() => this._handleLikePost()}
            handleUnlikePost={() => this._handleUnlikePost()}
            handleToggleComments={() => this._handleToggleComments()}
          />
        </div>
      </div>
    );
  }

  _handleDeletePost() {

  }

  async _handleLikePost() {
    try {
      const response = await likePost(this.props.postId);
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
      const response = await unlikePost(this.props.postId);
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
    try {
      const response = await getCommentsByPostId(this.props.postId, currentPage, this.state.fetchLimit);
      this.setState((prevState) => ({
        isCommentSectionVisible: !prevState.isCommentSectionVisible,
        comments: response.data.data.items,
        total: response.data.data.total
      }));
    }
    catch (e) {
      this.setState((prevState) => ({
        isCommentSectionVisible: !prevState.isCommentSectionVisible
      }));
    }
  }

  _handleTogglePostOptions() {
    this.setState((prevState) => ({
      isPostOptionsOpen: !prevState.isPostOptionsOpen,
    }))
  }
}


BarangayPostCard.propTypes = {
  authorId: PropTypes.string.isRequired,
  authorImg: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorLocation: PropTypes.string.isRequired,
  contentType: PropTypes.oneOf(['image', 'attachment']),
  isLiked: PropTypes.oneOf([0, 1]).isRequired,
  loggedUser: PropTypes.object,
  postId: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  postMessage: PropTypes.string.isRequired,
  postType: PropTypes.oneOf(['announcement', 'sharePost']).isRequired,
  statsComments: PropTypes.number.isRequired,
  statsLikes: PropTypes.number.isRequired,
  statsShares: PropTypes.number.isRequired,
}
