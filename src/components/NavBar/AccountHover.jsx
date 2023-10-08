import React, { useEffect } from 'react';
import './AccountHover.css';

const AccountHover = ({user}) => {

  return (
    <div className='account-container'>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
    </div>
  )
}

export default AccountHover;