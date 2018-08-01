/*--------------- React Core ---------------*/
import React from 'react';

/*--------------- Utilities ---------------*/
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";

const DashboardSidebar = observer((props) => {
  const { AppData } = props;
  const { loggedUser } = AppData;

  console.log(loggedUser);

  if (loggedUser) {
    return (
      <div className="home-sidebar card">
        <div className="card-body">
          {/*----------------- Barangay Member Info  -----------------*/}
          {loggedUser.user_role === 'barangay_member' && (
            <div>
              <img className="card-img mx-auto d-block" src="images/default-user.png" alt="Default User Thumbnail" />
              <h3 className="card-title">{`${loggedUser.user_first_name} ${loggedUser.user_last_name}`}</h3>
              <p className="card-text">{loggedUser.barangay_page_name}, <br /> {loggedUser.barangay_page_municipality}</p>
            </div>
          )}

          {/*----------------- Barangay Page Admin Info -----------------*/}
          {loggedUser.user_role === 'barangay_page_admin' && (
            <div>
              <img className="card-img mx-auto d-block" src="images/default-brgy.png" alt="Default Brgy Thumbnail" />
              <h3 className="card-title">{loggedUser.barangay_page_name}</h3>
              <p className="card-text">{loggedUser.barangay_page_municipality}</p>
            </div>
          )}
        </div>

        {/*--------------------- Barangay Member Options ---------------------*/}
        {loggedUser.user_role === 'barangay_member' && (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link to={viewBrgyPage(loggedUser.barangay_page_id)} className="card-link">My Barangay</Link>
              <span className="badge"></span>
            </li>
            <li className="list-group-item">
              <Link to={viewUserFollowingList(loggedUser.user_id)} className="card-link">Following</Link>
              <span className="badge">{loggedUser.stats.following_count}</span>
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
        )}

        {/*--------------------- Barangay Page Admin Options ---------------------*/}
        {loggedUser.user_role === 'barangay_page_admin' && (
          <ul className="list-group list-group-flush">
            <li className="list-group-item disabled">
              {`Logged in as ${loggedUser.user_first_name} ${loggedUser.user_last_name}`}
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
              <Link to={viewBrgyFollowersList(loggedUser.barangay_page_id)} className="card-link">Followers</Link>
              <span className="badge">{loggedUser.stats.follower_count}</span>
            </li>
            <li className="list-group-item"></li>
          </ul>
        )}
      </div>
    );
  }
  else {
    return null;
  }
});

const viewBrgyPage = (brgyId) => ({
  pathname: '/barangay',
  search: `?id=${brgyId}`
});

const viewBrgyFollowersList = (brgyId) => ({
  pathname: '/barangay',
  search: `?id=${brgyId}&view=followers_list`
});

const viewUserFollowingList = (userId) => ({
  pathname: '/profile',
  search: `?id=${userId}&view=following_list`
});



export default DashboardSidebar;
