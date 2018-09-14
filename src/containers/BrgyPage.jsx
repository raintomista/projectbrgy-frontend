import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from 'components/common/Nav/Bar';
import ProfileHeader from 'components/profile/ProfileHeader';
import BrgyPageView from 'components/brgy-page/BrgyPageView';
import queryString from 'query-string';

import { Modal, ModalBody } from 'reactstrap';

import { observer } from 'mobx-react';


import 'containers/BrgyPage.less';

@observer
export default class BrgyPage extends Component {

  async componentDidMount() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.props.AppData.getUserDetails();
    this.props.BrgyPageStore.fetchBrgyPageData(parsedQuery.id);
    this.props.BrgyPageStore.setViewType(parsedQuery.view);
  }

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.location.search;
    const query = this.props.location.search;
    const parsedPrevQuery = queryString.parse(prevQuery);
    const parsedQuery = queryString.parse(query);

    if (parsedPrevQuery.id !== parsedQuery.id) {
      this.props.BrgyPageStore.fetchBrgyPageData(parsedQuery.id);
    }

    if (parsedPrevQuery.view !== parsedQuery.view) {
      this.props.BrgyPageStore.setViewType(parsedQuery.view);
    }
  }

  render() {
    const { AppData, BrgyPageStore } = this.props;

    return (
      <div>
        <NavBar AppData={AppData} history={this.props.history} />
        {/* Barangay Page Header */}
        <ProfileHeader />

        {/* Barangay Page Content Grid */}
        <div className="brgy-page-content">
          <div className="container">
            {
              AppData.loggedUser && BrgyPageStore.data &&
              <BrgyPageView AppData={AppData} BrgyPageStore={BrgyPageStore} />
            }
          </div>
        </div>

        <Modal isOpen={BrgyPageStore.isModalOpen} toggle={() => BrgyPageStore.toggleModal()} size="lg" centered={true} className="e-services-modal">
          <ModalBody>
            <h3 className="modal-title">E-Services</h3>
            <div className="row justify-content-sm-center">
              {BrgyPageStore.data && BrgyPageStore.data.barangay_clearance === 1 && (
                <Link to='e-services/barangay-clearance' className="col-sm-4 e-service">
                  <div className="e-service-btn">
                    <img src="images/brgy-clearance.png" alt="" />
                  </div>
                  <span className="e-service-link">Barangay Clearance</span>
                </Link>
              )}

              {BrgyPageStore.data && BrgyPageStore.data.business_permit === 1 && (
                <div className="col-sm-4 e-service">
                  <Link to='e-services/business-permit' className="e-service-btn">
                    <img src="images/business-permit.png" alt="" />
                  </Link>
                  <span className="e-service-link">Business Permit</span>
                </div>
              )}

              {BrgyPageStore.data && BrgyPageStore.data.katarungang_pambarangay === 1 && (
                <div className="col-sm-4 e-service">
                  <Link to='e-services/katarungang-pambarangay' className="e-service-btn">
                    <img src="images/katarungang-pambarangay.png" alt="" />
                  </Link>
                  <span href="" className="e-service-link">Katarungang Pambarangay Services</span>
                </div>
              )}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}