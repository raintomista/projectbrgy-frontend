import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import queryString from 'query-string';

import NavBar from 'components/common/Nav/Bar';
import PostCard from 'components/common/Post/PostCard';

import { deletePost, getPostById, getSharedPostById } from 'services/PostService';

@observer
export default class ViewPostById extends Component {
  constructor(props) {
    super(props);
    this.state = { post: null, postType: null };
  }
  async componentDidMount() {
    // Get logged user data
    this.props.AppData.getUserDetails();

    // Parse search query
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);

    // Fetch post    
    this._handleFetch(parsedQuery.id, parsedQuery.type);
    this.setState({ postType: parsedQuery.type });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar AppData={this.props.AppData} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-6">
                {this.state.post && this._displayPost(this.state.post, this.state.postType)}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  _displayPost(post, postType) {
    return (
      <PostCard
        key={post.post_id}
        authorId={post.barangay_page_id}
        authorImg={'images/default-brgy.png'}
        authorName={post.barangay_page_name}
        authorRole={'barangay_page_admin'}
        authorLocation={post.barangay_page_municipality}
        displayCommentsOnLoad={true}
        handleDeletePost={() => this._handleDeletePost(post.post_id)}
        isLiked={post.is_liked}
        loggedUser={this.props.AppData.loggedUser}
        postId={post.post_id}
        postBrgyId={post.post_barangay_id}
        postDate={post.post_date_created}
        postMessage={post.post_message}
        postType={this.state.postType}
        statsComments={post.comment_count}
        statsLikes={post.like_count}
        statsShares={post.share_count}
      />
    );
  }

  async _handleDeletePost(postId) {
    const prompt = window.confirm("Are you sure you want to delete this post?");
    if (prompt) {
      try {
        const response = await deletePost(postId);
        alert(response.data.data.message);

        // Delete loaded newsfeed posts before navigating back to dashboard
        this.props.DashboardStore.reloadNewsfeed();
        this.props.history.push('/dashboard');
      } catch (e) {
        alert('An error occurred. Please try again.');
      }
    }
  }

  async _handleFetch(postId, postType) {
    try {
      let response;

      if (postType === 'announcement') {
        response = await getPostById(postId);
      }
      else if (postType === 'sharePost') {
        response = await getSharedPostById(postId);
      }

      this.setState({
        post: response.data.data,
      })
    }
    catch (e) {
      console.log(e);
    }
  }
}