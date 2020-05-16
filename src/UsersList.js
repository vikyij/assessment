import React from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { FiArrowRight } from 'react-icons/fi';
import './userslist.css'

function UsersList({ users, showCountry, onUserSelected }) {
     
  
  return users.map((user) => {

return (
      <div className="row user1" key={user.login.uuid}>
        <div className="col-3 my-img">
          <img
            src={user.picture.medium}
            className="my-logo"
            alt={user.name.first}
          />
        </div>

        <div className="col-9 my-user-data">
          <p className="user-name">
            <b>
              {user.name.first} {user.name.last}
            </b>
          </p>
          <p className="user-address">
            {`
              ${user.location.street.number} ${user.location.street.name}, ${
              user.location.city
            } ${user.location.state}${
              showCountry ? ', ' + user.location.country : ''
            }
            `}
          </p>
          <div className="grp-row">
            <p className="user-email">
              <FaRegEnvelope className="svg2" /> {user.email}
            </p>
            <p className="user-email">
              <FiPhoneCall className="svg2" /> {user.phone}
            </p>
            <button
              type="button"
              className="btn arrow-btn"
              onClick={() => onUserSelected(user)}
            >
              <FiArrowRight className="svg1" />
            </button>
          </div>
        </div>
      </div>
    );
          })
}
export default UsersList;
