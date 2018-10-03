import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { getUserDetailsViaToken } from 'services/DashboardService';
import RootStore from 'stores/RootStore';

import NavBar from 'components/common/Nav/Bar';
import HomeView from 'components/home/HomeView';

export default class UnauthenticatedRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      authenticated: false,
    }
  }

  componentDidMount() {
    getUserDetailsViaToken()
      .then((response) => {
        const loggedUser = response.data.data;
        if (loggedUser) {
          this.setState({
            loading: false,
            authenticated: true,
          });
        }
      })
      .catch((e) => {
        if (e.response.data.errors[0].code === 'UNAUTH') {
          this.setState({
            loading: false,
            authenticated: false,
          });
        }
      })
  }
  render() {
    const token = localStorage.getItem('x-access-token');
    const { component: Component, exact, path, ...rest } = this.props;
    const { loading, authenticated } = this.state;
    const { AppData } = RootStore;

    return (
      <Route
        exact={exact}
        path={path}
        render={(props) => (
          loading
            ? (token
              ? (
                <React.Fragment>
                  <NavBar AppData={AppData} />
                  <div className="dashboard-content">
                  </div>
                </React.Fragment>
              )
              : <HomeView />
            )
            : (!authenticated
              ? <Component {...props} {...rest} />
              : <Redirect to='/dashboard' />
            )
        )}
      />
    );
  }
}


