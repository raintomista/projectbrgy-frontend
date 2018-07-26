import React, { Component } from 'react';
import ProfileHeader from 'components/profile/ProfileHeader';
import BrgyPageNewsfeedView from 'components/brgy-page/BrgyPageNewsfeedView';
import queryString from 'query-string';

import { observer } from 'mobx-react';

import 'containers/BrgyPage.less';

@observer
export default class BrgyPage extends Component {

  async componentDidMount() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.props.AppData.fetchBrgyPageData(parsedQuery.id);
    // this.props.AppData.setProfileView(parsedQuery.view);
  }

  // componentDidUpdate() {
  //     const searchQuery = this.props.location.search;
  //     const parsedQuery = queryString.parse(searchQuery);
  //     this.props.AppData.setProfileView(parsedQuery.view);
  // }


  render() {
    const { AppData } = this.props;
    return (
      <div>
        {/* Barangay Page Header */}
        <ProfileHeader />

        {/* Barangay Page Content Grid */}
        <div className="brgy-page-content">
          <div className="container">
            {
              AppData.loggedUser && AppData.pageData &&
              <BrgyPageNewsfeedView AppData={this.props.AppData} />
            }
          </div>
        </div>
      </div>
    );
  }
}