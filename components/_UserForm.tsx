import React from 'react'

export const UserForm = () => {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <button type="submit">Sign Up</button>
        </form>
    )
}
