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
  const { AppData } = props;
  const pageData = AppData.pageData;

  return (
    <div className="brgy-page-details card">

      {/* Essential Barangay Page Details */}
      <div className="basic-details card-body">
        <img src="images/default-brgy.png" alt="" className="card-img" />
        <h3 className="card-title">
          {pageData && `${pageData.name}`}
        </h3>
        <p className="card-text">{pageData && `${pageData.municipality}`}</p>
      </div>

      {/* Additional Barangay Page Details */}
      <ul className="additional-details list-group list-group-flush">

        {/* Email Address */}
        <li className="list-group-item">
          <a href={'mailto: barangay20@gov.ph'} className="card-link">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <span>barangay20@gov.ph</span>
          </a>
        </li>

        {/* Landline Number */}

        <li className="list-group-item">
          <a href={'callto: 123-45-78'} className="card-link">
            <FontAwesomeIcon icon={faPhone} className="icon" />
            <span>123-45-78</span>
          </a>
        </li>

        {/* Website Link */}

        <li className="list-group-item">
          <a href={''} className="card-link">
            <FontAwesomeIcon icon={faGlobe} className="icon" />
            <span>barangay20.com</span>
          </a>
        </li>

        <div className="buttons">
          {/* Follow Button */}
          <li className="follow-btn list-group-item">
            {
              pageData.followed ?
                <a className="btn rounded filled" onClick={() => AppData.unfollowBarangay(pageData.id)}>Following</a> :
                <a className="btn rounded" onClick={() => AppData.followBarangay(pageData.id)}>Follow</a>
            }
          </li>

          {/* Message */}
          <li className="message-btn list-group-item">
            <a className="btn rounded">Message</a>
          </li>
        </div>
      </ul>

      {/* Barangay Resources  */}
      <ul className="brgy-resources list-group list-group-flush">

        {/* Dropbox */}
        <li className="list-group-item">
          <a href="" className="card-link">
            <FontAwesomeIcon icon={faDropbox} className="icon" />
            <span>Dropbox</span>
          </a>
        </li>

        {/* E-Services */}
        <li className="list-group-item">
          <a href="" className="card-link">
            <FontAwesomeIcon icon={faCogs} className="icon" />
            <span>E-Services</span>
          </a>
        </li>

        {/* E-Resources */}
        <li className="list-group-item">
          <a href="" className="card-link">
            <FontAwesomeIcon icon={faFolder} className="icon" />
            <span>E-Resources</span>
          </a>
        </li>
      </ul>
    </div>
  );
});

export default BrgyPageDetails;