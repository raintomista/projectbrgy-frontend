import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { observer } from 'mobx-react';
import queryString from 'query-string';
import NavBar from 'components/common/Nav/Bar';
import { followBarangay, unfollowBarangay } from 'services/BrgyPageService';
import { search } from 'services/SearchService';
import BrgyPageAvatar from 'assets/images/default-brgy.png';
import './SearchView.less';

@observer
export default class ViewPostById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStart: 0,
      hasMore: true,
      limit: 15,
      query: '',
      results: []
    };
  }
  async componentDidMount() {
    // Get logged user data
    this.props.AppData.getUserDetails();

    // Parse search query
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.setState({ query: parsedQuery.query });
    document.title = `${parsedQuery.query} - B2P Search`;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search != this.props.location.search) {
      const searchQuery = this.props.location.search;
      const parsedQuery = queryString.parse(searchQuery);
      document.title = `${parsedQuery.query} - B2P Search`;
      this.setState({ query: parsedQuery.query });
      this.scroll.pageLoaded = 0
      this.setState({
        hasMore: true,
        results: []
      });
    }
  }

  render() {
    const results = this.state.results.map((result, index) => (
      <li className="list-group-item" key={result.id}>
        <div className="wrapper">
          {/* Profile Pic */}
          <Link to={this._handleViewBrgyPage(result.id)}>
            <img src={BrgyPageAvatar} className="profile-pic" alt="" />
          </Link>

          {/* Barangay Name and Location */}
          <div className="brgy-info">
            <Link to={this._handleViewBrgyPage(result.id)} className="brgy-name">{result.name}</Link>
            <div className="brgy-location">
              {`${result.municipality}, ${result.province}, ${result.region}`}
            </div>
          </div>
        </div>
        {
          result.is_followed === 1 ?
            <a className="d-none d-lg-inline btn rounded filled" onClick={() => this._handleUnfollow(result.id, index)}>Following</a> :
            <a className="d-none d-lg-inline btn rounded" onClick={() => this._handleFollow(result.id, index)}>Follow</a>
        }
      </li>
    ));

    const { hasMore, pageStart } = this.state;

    return (
      <React.Fragment>
        <NavBar AppData={this.props.AppData} history={this.props.history} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-12 col-lg-8">
                <div className="search-view card">
                  <div className="card-body">
                    <h4 className="card-title">Results for "{this.state.query}"</h4>
                    <ul className="list-group list-group-flush">
                      <InfiniteScroll
                        pageStart={pageStart}
                        loadMore={(page) => {
                          this._handleSearch(page)
                        }}
                        hasMore={hasMore}
                        loader={this.renderLoader()}
                        ref={(scroll) => { this.scroll = scroll; }}
                      >
                        {results}
                      </InfiniteScroll>
                      {!hasMore && results.length === 0 && (
                        <li className="list-group-item filler">
                          No barangay pages found for "{this.state.query}"
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  async _handleFollow(brgyId, index) {
    try {
      const response = await followBarangay(brgyId);
      let results = this.state.results.slice();
      results[index].is_followed = 1;
      this.setState({ results: results });
    } catch (e) {
      alert('An error occurred. Please try again');
    }
  }

  async _handleUnfollow(brgyId, index) {
    try {
      const response = await unfollowBarangay(brgyId);
      let results = this.state.results.slice();
      results[index].is_followed = 0;
      this.setState({ results: results });
    } catch (e) {
      alert('An error occurred. Please try again');
    }
  }

  async _handleSearch(page) {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    const query = parsedQuery.query;
    if (query && query.trim().length > 0) {
      try {
        const response = await search(query, page, this.state.limit);
        let results = [];
        if (page === 1) {
          results = response.data.data.items;
        } else {
          results = this.state.results.slice();
          results.push(...response.data.data.items);
        }

        if (response.data.data.items.length === 0) {
          this.setState({
            hasMore: false,
          });
        }
        this.setState({ results: results });
      } catch (e) {
        if (e.response.data.errors[0].code === 'ZERO_RES') {
          this.setState({
            results: [],
            hasMore: false,
          });
        } else {
          alert('An error occured. Please try again.')
        }
      }
    } else {
      this.setState({
        results: [],
        hasMore: false,
      });
    }
  }

  _handleViewBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    };
  }

  renderLoader() {
    return (
      <li className="list-group-item loader" key={0}>
        <div className="content-loader">
          <object data="images/loader.svg" type="image/svg+xml">
          </object>
        </div>
      </li>
    );
  }
}