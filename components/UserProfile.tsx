'use client';
import { useState } from 'react';



const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('Tony Jarvis');


  return (
      <div className="header">
        <h1>Welcome back<br />{userName}!</h1>
        <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
          Edit Name
        </button>
      </div>
  );
};

export default UserProfile;
