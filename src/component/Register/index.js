import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore'
import { courses } from '../../Utils/Objects/objects';
import './index.css'

export default function Register({db}){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  // Handles the register functionality of the user
  async function handleRegister(e){
    e.preventDefault()
    
    // This object represents the user's form that it will be saved in our database.
    const docUser = {
        email: email,
        password: password,
        role: "student",
        courses: [
          {
            name: "Επικοινωνία Ανθρώπου Μηχανής",
            grade: 10
          }
        ]
    };

    try{
       // Create a Firebase doc that 'points' to our db and creates a collection "users" with primary key the email of the user
      const ref_user = doc(db, "users", email)
      // Then we use setDoc to push the 'user object' to the referenced user
      const res_user = await setDoc(ref_user, docUser);

      // At the same time we push all the courses at the db.
      // We create a 'courses' collection with primary key 'all_courses'
      const ref_courses = doc(db, "courses", "all_courses")
      const res_courses = await setDoc(ref_courses, courses);

      // Redirect to login route
      window.location.href = '/'

    }catch(e){
      console.log(e)
    }
    
  }
    return(
      <div className='register'>
        <form onSubmit={handleRegister} className='register-container'>
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
            <button type='submit'>Register</button>
            <a href='/'>Already have an Account?</a>
        </form>
      </div>
    )
}