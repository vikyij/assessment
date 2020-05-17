import React, { useState } from 'react';

import UsersList from './UsersList';
import UserDetails from './UserDetails';

function Users({ users, loading, showCountry, onShowingUserDetail }) {
  const [selectedUser, setSelectedUser] = useState(null);

  //if user is not found
  if (!users || !users.length) {
    return (<p style={{ display: 'block', clear: 'both', textAlign: 'center', marginBottom: 400 }}> User not found</p>);
  }


  function handleShowDetail(user) {
    //if not user, selectedUser state is set to null and onShowingUserDetail becomes false
    if (!user) {
      setSelectedUser(() => null);
      onShowingUserDetail(false);

      return;
    }
 //else selectedUser state is updated wuth the user
    setSelectedUser(() => user);
    onShowingUserDetail(true);
  }

  return (
    <>
      <p style={{ display: 'block', clear: 'both', textAlign: 'right' }}>
        {loading ? 'fetching new content...' : ' '}&nbsp;
      </p>

      {selectedUser ? (
        <UserDetails user={selectedUser} returnToList={handleShowDetail} />
      ) : (
        <UsersList
          users={users}
          showCountry={showCountry}
          onUserSelected={handleShowDetail}
        />
      )}
    </>
  );
}
export default Users;
