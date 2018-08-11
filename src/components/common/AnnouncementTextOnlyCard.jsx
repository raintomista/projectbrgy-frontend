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

@observer
export default class AnnouncementTextOnlyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.isLiked,
      showComments: false,
      comments: [],
      currentPage: 1,
      totalPage: 1
    };
  }

  render() {
    const { authorName, brgyId, city, date, imgSrc, loggedUser, postId, postMessage } = this.props;
    const { comments, showComments, totalPage, currentPage } = this.state;

    return (
      <div className="feed-post card">
        <div className="card-body">
          <div className="post-info-group">
            <Link to={this.viewBrgyPage(brgyId)} className="post-author">
              <img src={imgSrc} className="post-avatar" alt="" />
            </Link>
            <div className="post-info">
              <Link to={this.viewBrgyPage(brgyId)} className="post-author">{authorName}</Link>
              <Link to='/dashboard' className="post-location">{city}</Link>
              <Link to='/dashboard' className="post-timestamp">{this.formatDate(date)}</Link>
            </div>
            <Link to='/dashboard' className="more">
              <FontAwesomeIcon icon={faChevronDown} />
            </Link>
          </div>
          <div className="post-content">{postMessage}</div>
          <div className="post-buttons">
            {this.state.isLiked === 0 ?
              <a onClick={() => this.likePost(postId)} className="btn">Like</a>
              :
              <a onClick={() => this.unlikePost(postId)} className="btn">Liked</a>
            }

            <Link to='/dashboard' className="btn" onClick={() => this.toggleCommentSection(postId)}>Comment</Link>
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
      this.setState({ isLiked: 1 });
    }
    catch (e) {
      console.log(e)
    }
  }

  async unlikePost(postId) {
    try {
      const response = await unlikePost(postId);
      this.setState({ isLiked: 0 });
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
      const { showComments, currentPage } = this.state;
      const response = await getCommentsByPostId(postId, currentPage, 3);
      const total = response.data.data.total;

      this.setState({
        showComments: !showComments,
        comments: response.data.data.items,
        totalPage: Math.round((total / 3) + ((total % 3) / 3)),
      });
    }
    catch (e) { //Notify backend to change empty array to status 201
      const { showComments, currentPage } = this.state;
      this.setState({
        showComments: !showComments,
        comments: [],
        totalPage: 1,
      });
    }
  }

  viewBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    }
  }
}