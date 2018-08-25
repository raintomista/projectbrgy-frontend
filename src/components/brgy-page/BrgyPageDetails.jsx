import React from 'react';

/*----------------- FontAwesome -----------------*/
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import faCogs from '@fortawesome/fontawesome-free-solid/faCogs';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faFolder from '@fortawesome/fontawesome-free-solid/faFolder';
import faGlobe from '@fortawesome/fontawesome-free-solid/faGlobe';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';

/*----------------- MobX -----------------*/
import { observer } from 'mobx-react';

/*----------------- Stylesheets -----------------*/
import 'components/brgy-page/BrgyPageDetails.less'

const BrgyPageDetails = observer((props) => {
  const { AppData, BrgyPageStore } = props;
  const { loggedUser } = AppData;
  const { data } = BrgyPageStore;

  return (
    <div className="brgy-page-details card">

      {/* Essential Barangay Page Details */}
      <div className="basic-details card-body">
        <img src="images/default-brgy.png" alt="" className="card-img" />
        <h3 className="card-title">
          {BrgyPageStore.data && `${BrgyPageStore.data.name}`}
        </h3>
        <p className="card-text">{BrgyPageStore.data && `${BrgyPageStore.data.municipality}`}</p>
      </div>

      {/* Additional Barangay Page Details */}
      <ul className="additional-details list-group list-group-flush">

        {/* Email Address */}

        {BrgyPageStore.data && BrgyPageStore.data.email && (
          <li className="list-group-item">
            <a href={'mailto: barangay20@gov.ph'} className="card-link">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <span>{BrgyPageStore.data.email}</span>
            </a>
          </li>
        )}


        {/* Landline Number */}

        {BrgyPageStore.data && BrgyPageStore.data.landline_number && (
          <li className="list-group-item">
            <a href={`callto: ${BrgyPageStore.data.landline_number}`} className="card-link">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <span>{BrgyPageStore.data.landline_number}</span>
            </a>
          </li>
        )}

        {/* Website Link */}

        {BrgyPageStore.data && BrgyPageStore.data.website && (
          <li className="list-group-item">
            <a href={`${BrgyPageStore.data.website}`} className="card-link">
              <FontAwesomeIcon icon={faGlobe} className="icon" />
              <span>{BrgyPageStore.data.website}</span>
            </a>
          </li>
        )}

        <div className="buttons">
          {/* Follow Button */}
          {((loggedUser.user_role === 'barangay_page_admin' && loggedUser.user_barangay_id !== data.id) ||
            loggedUser.user_role === 'barangay_member') && (
              <React.Fragment>
                <li className="follow-btn list-group-item">

                  {BrgyPageStore.data.is_following ?
                    <a className="btn rounded filled" onClick={() => BrgyPageStore.unfollowBarangay(BrgyPageStore.data.id)}>Following</a> :
                    <a className="btn rounded" onClick={() => BrgyPageStore.followBarangay(BrgyPageStore.data.id)}>Follow</a>
                  }
                </li>

              </React.Fragment>
          )}

          {/* Message */}
          <li className="message-btn list-group-item">
            <a className="btn rounded">Message</a>
          </li>
        </div>
      </ul>

      {/* Barangay Resources  */}
      <ul className="brgy-resources list-group list-group-flush">

        {/* Dropbox */}
        {BrgyPageStore.data && BrgyPageStore.data.dropbox && (
          <li className="list-group-item">
            <a href={`${BrgyPageStore.data.dropbox}`} className="card-link">
              <FontAwesomeIcon icon={faDropbox} className="icon" />
              <span>Dropbox</span>
            </a>
          </li>
        )}

        {/* E-Services */}
        <li className="list-group-item">
          <a onClick={() => BrgyPageStore.toggleModal()} className="card-link">
            <FontAwesomeIcon icon={faCogs} className="icon" />
            <span>E-Services</span>
          </a>
        </li>

        {BrgyPageStore.data && BrgyPageStore.data.e_resources && (
          <li className="list-group-item">
            <a href={`${BrgyPageStore.data.e_resources}`} className="card-link">
              <FontAwesomeIcon icon={faFolder} className="icon" />
              <span>E-Resources</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
});

export default BrgyPageDetails;