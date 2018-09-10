import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import queryString from 'query-string';
import NavBar from 'components/common/Nav/Bar';
import { search } from 'services/SearchService';
import BrgyPageAvatar from 'assets/images/default-brgy.png';
import Loader from 'assets/images/loader.svg';

import './SearchView.less';

@observer
export default class ViewPostById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
    this._handleSearch(parsedQuery.query);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search != this.props.location.search) {
      const searchQuery = this.props.location.search;
      const parsedQuery = queryString.parse(searchQuery);
      this.setState({ query: parsedQuery.query });
      this._handleSearch(parsedQuery.query);;
    }
  }

  render() {
    const results = this.state.results.map((result, index) => (
      <li className="list-group-item" key={result.id}>
        <div className="wrapper">
          {/* Profile Pic */}
          <Link to={this._handleViewUserBrgyPage(result.id)}>
            <img src={BrgyPageAvatar} className="profile-pic" alt="" />
          </Link>

          {/* Barangay Name and Location */}
          <div className="brgy-info">
            <Link to={this._handleViewUserBrgyPage(result.id)} className="brgy-name">{result.name}</Link>
            <div className="brgy-location">
              {`${result.municipality}, ${result.province}, ${result.region}`}
            </div>
          </div>
        </div>
        <a className="btn rounded">Follow</a>
      </li>
    ));

    return (
      <React.Fragment>
        <NavBar AppData={this.props.AppData} history={this.props.history}/>
        <div className="dashboard-content">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-8">
                <div className="search-view card">
                  <div className="card-body">
                    <h4 className="card-title">Results for "{this.state.query}"</h4>
                    <ul className="list-group list-group-flush">
                      {this.state.loading && (
                        <li className="list-group-item">
                          <div className="loader">
                            <object data={Loader} type="image/svg+xml">
                            </object>
                          </div>
                        </li>
                      )}
                      {!this.state.loading && results}
                      {!this.state.loading && results.length === 0 && (
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

  async _handleSearch(query) {
    this.setState({ loading: true });

    if (query && query.trim().length > 0) {
      try {
        const response = await search(query);
        setTimeout(() => {
          this.setState({
            loading: false,
            results: response.data.data.items
          });
        }, 1000);
      } catch (e) {
        setTimeout(() => {
          this.setState({
            loading: false,
            results: []
          });
        }, 1000);
      }
    } else {
      setTimeout(() => {
        this.setState({
          loading: false,
          results: []
        });
      }, 1000);
    }
  }

  _handleViewUserBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    };
  }
}