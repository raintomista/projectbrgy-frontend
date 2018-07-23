import React from 'react';
import { Link } from "react-router-dom";

/********************************************************
*  [Subcomponent]: Two Variants of Dashboard Sidebar Options
*********************************************************/
const brgyOptions = (
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

const userOptions = (
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

/********************************************************
*  [Subcomponent]: Two Variants of Dashboard Sidebar Info
*********************************************************/

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

/**********************************
*  [Main Component]: Dashboard Sidebar
***********************************/
const DashboardSidebar = (props) => {
	const { loggedUser } = props;
	if (loggedUser) {
		const { name, barangay, municipality } = loggedUser;
		return (
			<div className="home-sidebar card">
				<div className="card-body">
					{/* Dashboard sidebar content depends on logged user */}
					{loggedUser.role === 'barangay_member' ?
						(
							// Name, Barangay, and Municipality will be displayed for Barangay Memebers
							<UserInfo name={name} barangay={barangay} municipality={municipality} />
						) : (
							// Barangay and Municipality will be displayed for Barangay Pages
							<BrgyInfo barangay={barangay} municipality={municipality} />
						)
					}
				</div>

				{/* Dashboard Sidebar Options vary depending on user privilege */}
				{loggedUser.role === 'barangay_member' ? userOptions : brgyOptions}
			</div>
		)
	}
	else {
		return null;
	}
}

export default DashboardSidebar;