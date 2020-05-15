import React, { useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { FiArrowRight } from 'react-icons/fi';
import UserList from './UserList'
import './users.css'

function Users({ users, loading, showCountry }) {
  const [selectedUser, setSelectedUser] = useState(null);

  if (!users || !users.length) {
    return null;
  }

  const userList = users.map((user) => {
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
              onClick={(e) => setSelectedUser(() => user)}
            >
              <FiArrowRight className="svg1" />
            </button>
          </div>
        </div>
      </div>
    );
  });

 function handleClick() {
   setSelectedUser(() => null)
 }

  if (selectedUser) {
    return (       
        <UserList user={selectedUser} handleClick={handleClick}/>          
    );
  }

  return (
    <>
      <p>{loading ? 'fetching new data...' : null}</p>

      {userList}
    </>
  );
}
export default Users;
