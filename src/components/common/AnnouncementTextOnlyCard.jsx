import React, { Component } from 'react';

/*---------------- FontAwesome ----------------*/
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown'

/*---------------- Utils ----------------*/
import Moment from 'moment';
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";

/*---------------- Service ----------------*/
import { likePost, unlikePost } from 'services/LikeService';

/*---------------- Components ----------------*/
import CommentSection from 'components/common/CommentSection';

@observer
export default class AnnouncementTextOnlyCard extends Component {
  constructor(props) {
    super(props);
    this.state = { showComments: false, isLiked: props.isLiked };
    this.toggleCommentSection = this.toggleCommentSection.bind(this);
  }
  render() {
    const { authorName, brgyId, city, date, imgSrc, postId, postMessage } = this.props;
    const { showComments } = this.state;
    
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
              <a  onClick={() => this.likePost(postId)} className="btn">Like</a>
              :
              <a onClick={() => this.unlikePost(postId)} className="btn">Liked</a>
            }

            <Link to='/dashboard' className="btn" onClick={this.toggleCommentSection}>Comment</Link>
            <Link to='/dashboard' className="btn">Share</Link>
          </div>
        </div>


        {/*<---------- Comments Sections ---------->*/}
        {showComments && (
          <CommentSection postId={postId}/>
        )}
      </div>
    );
  }

  async likePost(postId) {
    try {
      const response = await likePost(postId);
      this.setState({ isLiked: 1 });
    }
    catch(e) {
      console.log(e)
    }
  }

  async unlikePost(postId) {
    try {
      const response = await unlikePost(postId);
      this.setState({ isLiked: 0 });
    }
    catch(e) {
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

  toggleCommentSection() {
    const { showComments } = this.state;
    this.setState({ showComments: !showComments })
  }

  viewBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    }
  }
}