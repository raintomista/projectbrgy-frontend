import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const userOptions = (
	<ul className="list-group list-group-flush">
		<li className="list-group-item">
			<Link to='/dashboard' className="card-link">Reports</Link>
			<span className="badge">564</span>
		</li>
		<li className="list-group-item">
			<Link to='/dashboard' className="card-link">Resident Count</Link>
			<span className="badge">143</span>
		</li>
		<li className="list-group-item">
			<Link to='/dashboard' className="card-link">Message</Link>
			<span className="badge">5</span>
		</li>
		<li className="list-group-item">
			<Link to='/dashboard' className="card-link">E-Services</Link>
			<span className="badge">11</span>
		</li>
		<li className="list-group-item">
			<Link to='/dashboard' className="card-link">E-Resources</Link>
			<span className="badge">11</span>
		</li>
		<li className="list-group-item">
			<Link to='/dashboard' className="card-link">Followers</Link>
			<span className="badge">332</span>
		</li>
		<li className="list-group-item"></li>
	</ul>
);

const brgyOptions = (
	<ul className="list-group list-group-flush">
		<li className="list-group-item">
			<Link to='/dashboard' className="card-link">My Barangay</Link>
			<span className="badge"></span>
		</li>
		<li className="list-group-item">
			<Link to='/dashboard' className="card-link">Following</Link>
			<span className="badge">33</span>
		</li>
		<li className="list-group-item">
			<Link to='/dashboard' className="card-link">Reports</Link>
			<span className="badge">5</span>
		</li>
		<li className="list-group-item">
			<Link to='/dashboard' className="card-link">Responded</Link>
			<span className="badge">5</span>
		</li>
		<li className="list-group-item"></li>
	</ul>
);

const UserInfo = (props) => (
	<div>
		<img className="card-img mx-auto d-block" src="images/default-user.png" alt="Default User Thumbnail" />
		<h3 className="card-title">{props.name}</h3>
		<p className="card-text">{props.barangay}, <br /> {props.municipality}</p>
	</div>
);

const BrgyInfo = (props) => (
	<div>
		<img className="card-img mx-auto d-block" src="images/default-brgy.png" alt="Default Brgy Thumbnail" />
		<h3 className="card-title">{props.barangay}</h3>
		<p className="card-text">{props.municipality}</p>
	</div>
);

const DashboardSidebar = (props) => {
	const { loggedUser } = props;
	if (loggedUser) {
		const { name, barangay, municipality } = loggedUser;
		return (
			<div className="home-sidebar card">
				<div className="card-body">
					{loggedUser.role === 'barangay_member' ?
						(
							<UserInfo name={name} barangay={barangay} municipality={municipality} />
						) : (
							<BrgyInfo barangay={barangay} municipality={municipality} />
						)
					}

				</div>
				{loggedUser.role === 'barangay_member' ? userOptions : brgyOptions}

			</div>
		)
	}
	else {
		return (
			<div></div>
		);
	}
}

export default DashboardSidebar;