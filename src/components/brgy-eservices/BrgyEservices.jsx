import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import NavBar from 'components/common/Nav/Bar';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import BrgyClearanceTable from './subcomponents/BrgyClearanceTable';
import BusinessPermitTable from './subcomponents/BusinessPermitTable';
import KatarungangPambarangayTable from './subcomponents/KatarungangPambarangayTable';
import RootStore from 'stores/RootStore';

@observer
export default class BrgyEservices extends Component {
  componentDidMount() {
    document.title = 'My Barangay E-Services - B2P';
  }
  render() {
    const { AppData } = RootStore;
    const { loggedUser } = AppData;

    return (
      <React.Fragment>
        <NavBar AppData={AppData} history={this.props.history} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-4 col-xl-3">
                {loggedUser && <DashboardSideBar AppData={AppData} />}
              </div>
              <div className="my-barangay-reports col-md-8 col-lg-8 col-xl-9">
                <div className="title"><Link to='/dashboard'>My Barangay</Link> » E-services</div>
                <BrgyClearanceTable
                  AppData={AppData}
                  history={this.props.history}
                />
                <BusinessPermitTable
                  AppData={AppData}
                  history={this.props.history}
                />
                <KatarungangPambarangayTable
                  AppData={AppData}
                  history={this.props.history}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}