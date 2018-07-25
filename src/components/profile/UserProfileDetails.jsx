import React from 'react';
import { Link } from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone'

const UserProfileDetails = (props) => {
    return (
        <div className="user-profile-details card">
            {/* Essential User Details */}
            <div className="basic-details card-body">
                <img src="images/default-user.png" alt="" className="card-img" />
                <h3 className="card-title">Juan Dela Cruz</h3>
                <p className="card-text">Caloocan City</p>
            </div>

            {/* Additional User Details */}
            <ul className="additional-details list-group list-group-flush">
                {/* Email Address */}
                <li className="list-group-item">
                    <Link to="" className="card-link">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <span>barangay20@gov.ph</span>
                    </Link>
                </li>

                {/* Contact Number */}
                <li className="list-group-item">
                    <Link to="" className="card-link">
                        <FontAwesomeIcon icon={faPhone} className="icon" />
                        <span>1234-56-78</span>
                    </Link>
                </li>

                {/* See More Button */}
                <li className="see-more list-group-item">
                    <Link to="" className="nav-link">See More</Link>
                </li>
            </ul>
        </div>
    );
}

export default UserProfileDetails;