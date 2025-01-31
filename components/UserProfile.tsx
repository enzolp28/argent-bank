'use client';
import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery } from '../redux/profile/api';
import { setProfile} from '../redux/profile/slice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/auth/slice';
import { useRouter } from 'next/navigation';

const UserProfile = () => {
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated]);
  
  const [isEditing, setIsEditing] = useState(false);
  // const [userName, setUserName] = useState('Tony Jarvis');
  const { firstName, lastName} = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProfileQuery();
  console.log("data",data);

  useEffect(() => {
    if (data) {
      dispatch(setProfile(data));
    }
  }, [data]);



  return (
      <div className="header">
        {isLoading ? <p>Loading...</p> :
        <>
          <h1>Welcome back<br />{firstName} {lastName}!</h1>

          <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
            Edit Name
          </button>
        </>
          }
          {error && <p>Erreur de chargement du profil</p>}
      </div>
  );
};

export default UserProfile;
