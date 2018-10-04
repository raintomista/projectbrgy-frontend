import React, { Component } from 'react';
import { observer } from 'mobx-react';
import NavBar from 'components/common/Nav/Bar';
import NavBarAlt from 'components/common/Nav/BarAlt';
import './NotFound.less';

@observer
export default class NotFound404 extends Component {
  componentDidMount() {
    this.props.AppData.getUserDetails();
  }
  render() {
    const { AppData } = this.props;
    const { loggedUser } = AppData;

    return (
      <React.Fragment>
        {!loggedUser
          ? <NavBarAlt />
          : <NavBar AppData={AppData} history={this.props.history} />
        }
        <div className="dashboard-content">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-12">
                <div className="not-found-404 card">
                  <h2>Page Not Found!</h2>
                  <p>
                    The link you clicked may be broken or the page may have been removed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}