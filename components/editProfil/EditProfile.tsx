'use client'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import './EditProfile.css'



export default function EditProfile() {
    const router = useRouter();
    const { isAuthenticated } = useSelector((state) => state?.auth);
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/signin');
        }
    }, [isAuthenticated]);
    return (
        <div className='edit-container'>
            <h2>Modifier vos informations </h2>
            <form className='edit-form'>
                <label>
                    First Name:
                    <input
                        type="text"
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                    />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
