import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { getUserDetailsViaToken } from 'services/DashboardService';
import RootStore from 'stores/RootStore';

import NavBar from 'components/common/Nav/Bar';


export default class MemberOnlyRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      authenticated: false,
      restricted: false
    }
  }

  componentDidMount() {
    getUserDetailsViaToken()
      .then((response) => {
        const loggedUser = response.data.data;
        if (loggedUser.user_role === 'barangay_member') {
          this.setState({
            loading: false,
            authenticated: true,
            restricted: false
          });
        } else {
          this.setState({
            loading: false,
            authenticated: true,
            restricted: true,
          });
        }
      })
      .catch((e) => {
        if (e.response.data.errors[0].code === 'UNAUTH') {
          this.setState({
            loading: false,
            authenticated: false,
            restricted: false
          });
        }
      })
  }
  render() {
    const { component: Component, ...rest } = this.props;
    const { loading, authenticated, restricted } = this.state;
    const { AppData } = RootStore;
    return (
      <Route
        {...rest}
        render={(props) => {
          const token = localStorage.getItem('x-access-token');
          if (loading) {
            return (
              <React.Fragment>
                {token
                  ? (
                    <React.Fragment>
                      <NavBar AppData={AppData} />
                      <div className="dashboard-content">
                      </div>
                    </React.Fragment>
                  )
                  :
                  <div></div>
                }
              </React.Fragment>
            )
          } else {
            if (authenticated === false) {
              return <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
            } else if (authenticated === true && restricted === true) {
              return <Redirect to='/dashboard' />
            } else {
              return <Component {...props} />
            }
          }
        }}
      />
    );
  }
}


