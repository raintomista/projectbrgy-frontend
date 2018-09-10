import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { observer } from 'mobx-react';
import { search } from 'services/SearchService';
import SearchForm from './SearchForm'

import './SearchBar.less';

@observer
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false }
    this.form = new SearchForm();
  }
  render() {
    const results = this.form.$('results').value.map((barangay, index) => (
      <Link to={this._handleViewUserBrgyPage(barangay.id)} className="result" key={index}>
        {barangay.name}, {barangay.municipality}, {barangay.province}, {barangay.region}, Philippines
      </Link>
    ));

    return (
      <React.Fragment>
        <div className="nav-search-bar">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            {...this.form.$('query').bind()}
          />
          <div className="nav-search-results">
            {results}
            <Link
              to={this._handleSeeAllResults(this.form.$('query').value)}
              className="see-all"
            >
              See all results for {this.form.$('query').value}
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

  _handleViewUserBrgyPage(brgyId) {
    return {
      pathname: '/barangay',
      search: `?id=${brgyId}`
    };
  }

  _handleSeeAllResults(query) {
    return {
      pathname: '/search',
      search: `?query=${query}`
    };
  }
}