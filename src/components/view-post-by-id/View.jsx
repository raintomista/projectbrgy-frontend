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
    this.state = { post: null, postType: null, loading: true };
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

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.location.search != this.props.location.search) {
      // Parse search query
      const searchQuery = this.props.location.search;
      const parsedQuery = queryString.parse(searchQuery);

      // Fetch post    
      this._handleFetch(parsedQuery.id, parsedQuery.type);
      this.setState({ postType: parsedQuery.type });
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar AppData={this.props.AppData} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-6">
                {this.state.loading && (
                  <div className="loader">
                    <object data="images/loader.svg" type="image/svg+xml">
                    </object>
                  </div>
                )}
                {!this.state.loading && this.state.post && this._displayPost(this.state.post, this.state.postType)}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  _displayPost(post, postType) {
    if (postType === 'announcement') {
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
    } else if (postType === 'sharePost') {
      return (
        <PostCard
          key={post.share_id}

          // Author of the Share Post
          authorId={post.share_barangay_id}
          authorImg={'images/default-brgy.png'}
          authorName={post.barangay_page_name}
          authorRole={post.share_user_role}
          authorLocation={post.post_barangay_municipality}

          disableInteractions={true}
          handleDeletePost={() => { }}
          isLiked={0}
          loggedUser={this.props.AppData.loggedUser}

          // Share Post
          postId={post.share_id}
          postBrgyId={post.share_barangay_id}
          postDate={post.share_date_created}
          postMessage={post.share_caption}
          postType={'sharePost'}

          // Shared Post (Post that is being shared)
          sharedPostId={post.post_id}
          sharedPostAuthor={post.post_barangay_name}
          sharedPostAuthorId={post.post_barangay_id}
          sharedPostAuthorImg={'images/default-brgy.png'}
          sharedPostDate={post.post_date_created}
          sharedPostLocation={post.post_barangay_municipality}
          sharedPostMessage={post.post_message}

          // Stats of the Share Post
          statsComments={0}
          statsLikes={0}
          statsShares={0}
        />
      );
    }
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
    this.setState({ loading: true });
    try {
      let response;

      if (postType === 'announcement') {
        response = await getPostById(postId);
      }
      else if (postType === 'sharePost') {
        response = await getSharedPostById(postId);
      }

      setTimeout(() => {
        this.setState({
          loading: false,
          post: response.data.data,
        });
      }, 1000);
    }
    catch (e) {
      console.log(e);
    }
  }
}