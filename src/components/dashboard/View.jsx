import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

// Subcomponents
import NavBar from 'components/common/Nav/Bar';
import DashboardPostBox from './subcomponents/PostBox';

// Stylesheet
import './View.less';

@observer
export default class DashboardView extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar AppData={this.props.AppData}/>
        <div className="dashboard-content">
          <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <DashboardPostBox />
            </div>
          </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

DashboardView.propTypes = {
  AppData: PropTypes.object,
  DashboardStore: PropTypes.object
}