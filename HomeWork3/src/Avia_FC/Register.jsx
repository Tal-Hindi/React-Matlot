import React, { useState } from 'react'


export default function Register() {

    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        passwordAuthentication: "",
        image: "",
        firstname: "",
        lastname: "",
        email: "",
        birthday: "",
        city: "",
        street: "",
        houseNumber: ""
    })


    const [userIdCounter, setUserIdCounter] = useState(1);

    function generateUniqueId() {
        const newId = userIdCounter;
        setUserIdCounter(prevCounter => prevCounter + 1);
        return newId;
    }

    function handleChange(event) {

        const { value, id } = event.target;  //Destructre

        //takes the prev value of the entire state and changes the current e element 
        setUserDetails(prevValue => ({
            ...prevValue,
            [id]: value

        }));

    }


    function registerUser(event) {
        event.preventDefault(); // Prevents the default form submission behavior

        // Create a new user object
        const newUser = {
            id: generateUniqueId(),
            ...userDetails
        };

        // Get existing users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Add the new user to the list
        const updatedUsers = [...existingUsers, newUser];

        // Update localStorage with the updated list of users
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Reset the form after successful registration
        setUserDetails({
            username: "",
            password: "",
            passwordAuthentication: "",
            image: "",
            firstname: "",
            lastname: "",
            email: "",
            birthday: "",
            city: "",
            street: "",
            houseNumber: ""
        });
    }

    return (
        <>
            <div>
                <h3>Register</h3>
                <form onSubmit={registerUser}>
                    <div>
                        <label htmlFor="username">User name: </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="User name"
                            value={userDetails.username}
                            onChange={handleChange}>
                        
                        </input>
                    </div>

                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={userDetails.password}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="password">Password Authentication: </label>
                        <input
                            type="password"
                            id="passwordAuthenication"
                            placeholder="Password"
                         //   onChange={}
                         >
                        </input>
                    </div>
                    <div>
                        <label htmlFor="img" >Image: </label>
                        <input
                            type="file"
                            id="img"
                            placeholder="Your image"
                            value={userDetails.image}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="firstname" >First name: </label>
                        <input
                            type="text"
                            id="firstname"
                            placeholder="First name"
                            value={userDetails.firstname}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="lastname">Last name: </label>
                        <input
                            type="text"
                            id="lastname"
                            placeholder="Last name"
                            value={userDetails.lastname}
                            onChange={handleChange}>
                        </input>

                    </div>
                    <div>
                        <label htmlFor="email">Email address: </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="name@example.com"
                            value={userDetails.email}
                            onChange={handleChange}>
                        </input>

                    </div>
                    <div>
                        <label htmlFor="birthday">Birthday:</label>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={userDetails.birthday}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="city">City: </label>
                        <input
                            type="text"
                            id="city"
                            placeholder="City"
                            value={userDetails.city}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="street">Street: </label>
                        <input
                            type="text"
                            id="street"
                            placeholder="Street"
                            value={userDetails.street}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="houseNumber">House number: </label>
                        <input
                            type="text"
                            id="houseNumber"
                            placeholder="House Number"
                            value={userDetails.houseNumber}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <button type="submit"> Register </button>
                    </div>
                </form>
            </div>
        </>
    );
}

