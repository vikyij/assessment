import React, { useState } from 'react';

import UsersList from './UsersList';
import UserDetails from './UserDetails';

function Users({ users, loading, showCountry, onShowingUserDetail }) {
  const [selectedUser, setSelectedUser] = useState(null);

  if (!users || !users.length) {
    return null;
  }

  function handleShowDetail(user) {
    if (!user) {
      setSelectedUser(() => null);
      onShowingUserDetail(false);

      return;
    }

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
