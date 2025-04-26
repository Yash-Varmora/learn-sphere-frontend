import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
    const { user, isLoading } = useSelector((state) => state.auth);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
        </div>
    )
}

export default Profile