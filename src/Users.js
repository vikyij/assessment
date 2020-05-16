import React, { useState } from 'react';
import UsersList from './UsersList'
import UserDetails from './UserDetails'

function Users({ users, loading, showCountry }) {
  const [selectedUser, setSelectedUser] = useState(null);

  if (!users || !users.length) {
    return null;
  }

  return (
    <>
      <p>{loading ? 'fetching new data...' : null}</p>

      {selectedUser ? (
        <UserDetails
          user={selectedUser}
          returnToList={() => setSelectedUser(() => null)}
        />
      ) : (
        <UsersList
          users={users}
          showCountry={showCountry}
          onUserSelected={(user) => setSelectedUser(() => user)}
        />
      )}
    </>
  );
}
export default Users;