import './index.css'
import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore'

export default function Login({db}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
      // Handles the login functionality of the user
    async function handleLogin (e){
        e.preventDefault()
        
        // We create a doc that 'points' at collection 'users' with primary key user's input email 
        const ref = doc(db, "users", email); 
        // Now "Bring me, from the collection 'users' the document with name/value 'email'"
        const res = await getDoc(ref);

        //If the user with email = "email" and password = "passowrd" exists in the db...
        if (res.exists() && res.data().email === email && res.data().password === password) {
            // Get the role and email...
            const user_role = res.data().role
            const user_email = res.data().email

            // Store the email and role as keys in your browser local storage
            localStorage.setItem('role', user_role)
            localStorage.setItem('email', user_email)

            // Go to page /courses
            window.location.href = './courses'
            console.log("Found User:", res.data());
        } else {
            console.log("No such document!");
        }
    }

    return(
        <div className='login'>
            <form onSubmit={handleLogin} className='login-container'>
                <h2>Login</h2>
                <div className='login-row'>
                    <label>Email:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='login-row'>
                    <label>Password:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Login</button>
                <a href='/register'>Create new user</a>
            </form>
        </div>
    )
}