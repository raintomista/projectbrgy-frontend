import React, { Component } from 'react';
import ProfileHeader from 'components/profile/ProfileHeader';
import BrgyPageNewsfeedView from 'components/brgy-page/BrgyPageNewsfeedView';
import queryString from 'query-string';

import { Modal, ModalBody } from 'reactstrap';

import { observer } from 'mobx-react';

import 'containers/BrgyPage.less';

@observer
export default class BrgyPage extends Component {

  async componentDidMount() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.props.BrgyPageStore.fetchBrgyPageData(parsedQuery.id);
    // this.props.AppData.setProfileView(parsedQuery.view);
  }

  // componentDidUpdate() {
  //     const searchQuery = this.props.location.search;
  //     const parsedQuery = queryString.parse(searchQuery);
  //     this.props.AppData.setProfileView(parsedQuery.view);
  // }


  render() {
    const { AppData, BrgyPageStore } = this.props;
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
    console.log(BrgyPageStore);

    return (
      <div>
        {/* Barangay Page Header */}
        <ProfileHeader />

        {/* Barangay Page Content Grid */}
        <div className="brgy-page-content">
          <div className="container">
            {
              AppData.loggedUser && BrgyPageStore.data &&
              <BrgyPageNewsfeedView AppData={AppData} BrgyPageStore={BrgyPageStore} />
            }
          </div>
        </div>

        <Modal isOpen={BrgyPageStore.isModalOpen} toggle={() => BrgyPageStore.toggleModal()} size="lg" centered={true}>
          <ModalBody>
            <h4 className="modal-title">E-Services</h4>
            <div className="row justify-content-sm-center">
              {BrgyPageStore.data && BrgyPageStore.data.barangay_clearance === 1 && (
                <div className="col-sm-4 e-service">
                  <div className="e-service-btn">
                    <img src="images/brgy-clearance.png" />
                  </div>
                  <h5>Barangay Clearance</h5>
                </div>
              )}

              {BrgyPageStore.data && BrgyPageStore.data.business_permit === 1 && (
                <div className="col-sm-4 e-service">
                  <div className="e-service-btn">
                    <img src="images/business-permit.png" />
                  </div>
                  <h5>Business Permit</h5>
                </div>
              )}

              {BrgyPageStore.data && BrgyPageStore.data.katarungang_pambarangay === 1 && (
                <div className="col-sm-4 e-service">
                  <div className="e-service-btn">
                    <img src="images/katarungang-pambarangay.png" />
                  </div>
                  <h5>Katarungang Pambarangay Services</h5>
                </div>
              )}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}