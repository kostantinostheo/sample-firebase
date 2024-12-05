import React, { useState } from 'react';
import './index.css'
import { FIREBASE_AUTH } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [loading, setLoading] = useState(false);
  
  async function SignUp(event) {
    event.preventDefault(); // Prevent default form submission
    
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log("User registered:", res.user);
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  

    return(
      <div className='register'>
        <form onSubmit={SignUp} className='register-container'>
            <h2>Register</h2>
            <div className='register-row'>
                <label>Email:</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='register-row'>
                <label>Password:</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type='submit'> {loading ? 'Creating user' : 'Register'}</button>
            <a href='/'>Already have an Account?</a>
        </form>
      </div>
    )
}