import React from 'react'

export default function Login() {
    return (
        <div>
        <h3>Login:</h3>
            <div>
                <label htmlFor="loginUsername"> User name:</label><br/>
                <input type="text" id="loginUsername"></input>
            </div>
            <div>
                <label htmlFor="loginPassword"> password:</label><br/>
                <input type="password" id="loginPassword"></input>
            </div>
        </div>
    )
}
