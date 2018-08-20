import React, { Component } from 'react';

/*---------------- FontAwesome ----------------*/
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown'

/*---------------- Utils ----------------*/
import Moment from 'moment';
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";

/*---------------- Service ----------------*/
import { getCommentsByPostId } from 'services/CommentService';
import { likePost, unlikePost } from 'services/LikeService';

/*---------------- Components ----------------*/
import CommentSection from 'components/common/CommentSection';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import 'components/common/AnnouncementCard.less';

@observer
export default class AnnouncementTextOnlyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isLiked: props.isLiked,
      showComments: false,
      likeCount: props.likeCount,
      commentCount: props.commentCount,
      shareCount: props.shareCount,
      comments: [],
      currentPage: 1,
      totalPage: 1,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  render() {
    const { authorName, brgyId, city, date, imgSrc, loggedUser, postId, postMessage } = this.props;
    const { comments, showComments, totalPage, currentPage } = this.state; //Comment section-related
    const { likeCount, commentCount, shareCount } = this.state; //Post Stats

    return (
      <div className="feed-post card">
        <div className="card-body">
          <div className="post-details-group">
            <Link to={this.viewBrgyPage(brgyId)}>
              <img src={imgSrc} className="post-author-avatar" alt="" />
            </Link>
            <div className="post-details">
              <Link to={this.viewBrgyPage(brgyId)} className="post-author">{authorName}</Link>
              <Link to='/dashboard' className="post-location">{city}</Link>
              <span> &middot; </span>
              <Link to='/dashboard' className="post-timestamp">{this.formatDate(date)}</Link>
            </div>
            <div className="post-options">
              <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle><FontAwesomeIcon icon={faChevronDown} /></DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Delete Post</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="post-content">
            <div className="post-caption">
              {postMessage}
            </div>
          </div>
          <div className="post-stats">
            <div className="post-stats-left">
              {likeCount > 0 && (
                <Link to='/' className="post-likes-count">
                  {likeCount === 1 ? `${likeCount} Like` : `${likeCount} Likes`}
                </Link>
              )}

            </div>
            <div className="post-stats-right">
              {commentCount > 0 && (
                <a className="post-comments-count" onClick={() => this.toggleCommentSection(postId)}>
                  {commentCount === 1 ? `${commentCount} Comment` : `${commentCount} Comments`}
                </a>
              )}
              {shareCount > 0 && (
                <Link to='/' className="post-shares-count">
                  {shareCount === 1 ? `${shareCount} Share` : `${shareCount} Share`}
                </Link>
              )}
            </div>
          </div>
          <div className="post-buttons">
            {this.state.isLiked === 0 ?
              <a onClick={() => this.likePost(postId)} className="btn">Like</a>
              :
              <a onClick={() => this.unlikePost(postId)} className="btn liked">Liked</a>
            }

            <a className="btn" onClick={() => this.toggleCommentSection(postId)}>Comment</a>
            <Link to='/dashboard' className="btn">Share</Link>
          </div>
        </div>


        {/*<---------- Comments Sections ---------->*/}
        {showComments && (
          <CommentSection
            postId={postId}
            comments={comments}
            totalPage={totalPage}
            currentPage={currentPage}
            loggedUser={loggedUser}
          />
        )}
      </div>
    );
  }

  async likePost(postId) {
    try {
      const response = await likePost(postId);
      const { likeCount } = this.state;

      this.setState((prevState) => ({
        isLiked: 1,
        likeCount: prevState.likeCount + 1
      }));
    }
    catch (e) {
      console.log(e)
    }
  }

  async unlikePost(postId) {
    try {
      const response = await unlikePost(postId);
      this.setState((prevState) => ({
        isLiked: 0,
        likeCount: prevState.likeCount - 1
      }));
    }
    catch (e) {
      console.log(e)
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

  async toggleCommentSection(postId) {
    try {
      const { currentPage } = this.state;

      const response = await getCommentsByPostId(postId, currentPage, 4);
      const total = response.data.data.total;

      this.setState((prevState) => ({
        showComments: !prevState.showComments,
        comments: response.data.data.items,
        totalPage: Math.ceil(total/4)
      }));
    }
    catch (e) { //Notify backend to change empty array to status 201
      this.setState((prevState) => ({
        showComments: !prevState.showComments,
        comments: [],
        totalPage: 1,
      }));
    }
  }

  viewBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    }
  }

  toggleDropdown() {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen
    }))
  }
}