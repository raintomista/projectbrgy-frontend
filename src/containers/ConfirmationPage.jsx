import React from 'react';
import ConfirmationMsg from 'components/common/ConfirmationMsg';
import NavBar from 'components/common/NavBar';
import 'stylesheets/containers/ConfirmationPage.less';

let messages = new Map();

messages.set('complaint', {
  title: 'Complaint Sent!',
  message: `You will receive the confirmation of Certification to File Action 
                from the Lupon Tagapamayapa/Pangkat Secretary in 3 days, including 
                the available date of hearing. Thank you!`
});

messages.set('clearance', {
  title: 'Barangay Clearance Form Sent!',
  message: `Please bring the required documents along with the permit fee of 
              [insert amount]. Your photo and thumb print will be processed upon 
              pick up of your Barangay Clearance on [insert date and time]. Thank you!`
});

messages.set('business-permit', {
  title: 'Barangay Business Permit Form Sent!',
  message: `Please bring the required documents along with the permit fee of [insert amount] 
            note amount differs based on type of service] to pick up your Barangay Business 
            Clearance on [insert date and time]. Thank you!`
});


const ConfirmationPage = (props) => (
  <div className="confirmation-page">
    <NavBar />
    <div className="dashboard-content">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ConfirmationMsg
              title={messages.get(props.type).title}
              message={messages.get(props.type).message}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ConfirmationPage;
