import './index.css'
import React, { useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export default function Login({app}){

    const db = getFirestore(app);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleLogin (e){
        e.preventDefault()
        
        const ref = doc(db, "users", email); //"Bring me, from the collection 'users' the document with name/value 'email'"
        const res = await getDoc(ref);

        //If the user with email = "email" exists in the db...
        if (res.exists()) {
            const user_role = res.data().role
            const user_email = res.data().email

            localStorage.setItem('role', user_role)
            localStorage.setItem('email', user_email)

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