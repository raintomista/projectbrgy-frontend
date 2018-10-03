import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import queryString from 'query-string';

import NavBar from 'components/common/Nav/Bar';
import PostCard from 'components/common/Post/PostCard';

import { deletePost, getPostById, getSharedPostById, unsharePost } from 'services/PostService';

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
        <NavBar AppData={this.props.AppData} history={this.props.history} />
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
          attachments={post.attachments}
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
      let authorId = post.share_user_role === 'barangay_page_admin' ? post.share_barangay_id : post.share_user_id;
      let authorImg = post.share_user_role === 'barangay_page_admin' ? 'images/default-brgy.png' : 'images/default-user.png';
      let authorName = post.share_user_role === 'barangay_page_admin' ? post.barangay_page_name : `${post.user_first_name} ${post.user_last_name}`;
      let postBrgyId = post.share_user_role === 'barangay_page_admin' ? post.share_barangay_id : post.user_barangay_id;
      return (
        <PostCard
          key={post.share_id}

          // Author of the Share Post
          attachments={post.attachments}
          authorId={authorId}
          authorImg={authorImg}
          authorName={authorName}
          authorRole={post.share_user_role}
          authorLocation={post.post_barangay_municipality}

          disableInteractions={true}
          handleDeletePost={() => this._handleUnsharePost(post.share_id)}
          isLiked={0}
          loggedUser={this.props.AppData.loggedUser}

          // Share Post
          postId={post.share_id}
          postBrgyId={postBrgyId}
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

  async _handleUnsharePost(postId) {
    const prompt = window.confirm("Are you sure you want to delete this post?");
    if (prompt) {
      try {
        const response = await unsharePost(postId);
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
        document.title = `${response.data.data.barangay_page_name} - ${response.data.data.barangay_page_name} posted an announcement.`;

      }
      else if (postType === 'sharePost') {
        response = await getSharedPostById(postId);
        if (response.data.data.user_role === 'barangay_page_admin') {
          document.title = `${response.data.data.barangay_page_name} - ${response.data.data.barangay_page_name} shared an announcement.`;
        } else {
          document.title = `${response.data.data.user_first_name} ${response.data.data.user_last_name} - ${response.data.data.user_first_name} ${response.data.data.user_last_name} shared an announcement.`;
        }
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