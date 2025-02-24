'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProfileMutation, useUpdateProfileMutation } from '../redux/profile/api';
import { setProfile } from '../redux/profile/slice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';
import './styles/EditForm.css';


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
  const { firstName, lastName } = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch();
  const [getProfile, { isLoading, error }] = useGetProfileMutation();
  const [updateProfile, { isLoading: isUpdating, error: updateError }] = useUpdateProfileMutation();


  const [firstNameInput, setFirstNameInput] = useState(firstName);
  const [lastNameInput, setLastNameInput] = useState(lastName);

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ firstName: firstNameInput, lastName: lastNameInput });
      if (!updateError) {
        dispatch(setProfile({ firstName: firstNameInput, lastName: lastNameInput }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }

  };


  useEffect(() => {
    async function fetchProfile() {
      const result = await getProfile().unwrap();

      if (result) {
        const { firstName, lastName } = result?.body;
        dispatch(setProfile({ firstName: firstName, lastName: lastName }));
        setFirstNameInput(firstName);
        setLastNameInput(lastName);
      }
    }
    fetchProfile();
  }, []);


  console.log("lastNameInput", lastNameInput)

  return (
    <div className="header">
      {isLoading ? <p>Loading...</p> :
        <>
          <h1>Welcome back {firstName} {lastName}</h1>

          {/* <button className="edit-button" onClick={() => setIsEditing(!isEditing)} > */}
          {!isEditing ?
            <button className="edit-button" onClick={() => setIsEditing(!isEditing)} >
              Edit Name
            </button>
            :
            <form className='edit-form' onSubmit={handleUpdateProfile}>
              <div className="edit-form_inputs">

                <input type="text" value={firstNameInput} onChange={(e) => setFirstNameInput(e.target.value)} />

                <input type="text" value={lastNameInput} onChange={(e) => setLastNameInput(e.target.value)} />
              </div>
              <div className="edit-form_buttons">
                <button type="submit"> {!isUpdating ? "Save" : "Saving..."}</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>}
        </>
      }
      {error && <p>Erreur de chargement du profil</p>}
    </div>
  );
};

export default UserProfile;
