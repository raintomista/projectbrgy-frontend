import React, { Component } from 'react';
import NavBarAlt from 'components/common/Nav/BarAlt';
import './NotFound.less';
export default class NotFound404 extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBarAlt />
        <div className="dashboard-content">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-10">
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