/*--------------- React Core ---------------*/
import React, { Component } from 'react';

/*--------------- Components ---------------*/
import NavBar from 'components/common/NavBar';
import DashboardFeedCard from 'components/dashboard/DashboardFeedCard';
import DashboardPostBox from 'components/dashboard/DashboardPostBox';
import DashboardSidebar from 'components/dashboard/DashboardSidebar';
import NewsFeedOptions from 'components/dashboard/NewsFeedOptions';

/*--------------- Utilities ---------------*/
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom'

/*--------------- Stylesheets ---------------*/
import 'stylesheets/containers/Dashboard.less';

@observer
export default class Dashboard extends Component {
  componentDidMount() {
    this.props.AppData.getUserDetails();
  }

  render() {
    const { AppData, DashboardStore } = this.props;

    return (
      <div>
        {/* {this.state.logged === false && <Redirect to='/login' />} */}
        <NavBar AppData={AppData} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <DashboardSidebar AppData={AppData} />
              </div>
              <div className="col-md-6">
                <DashboardPostBox AppData={AppData}/>
                <NewsFeedOptions />
                <DashboardFeedCard
                  imgSrc="images/default-brgy.png"
                  authorName="Barangay 69"
                  city="Caloocan City"
                  date={new Date()}
                />
                <DashboardFeedCard
                  imgSrc="images/default-user.png"
                  authorName="Barangay 35"
                  city="Caloocan City"
                  date={new Date(2018, 5, 19, 3, 0, 10)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}