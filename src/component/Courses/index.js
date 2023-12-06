import './index.css'
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import './index.css'
import { logout } from '../../Utils/Methods';

export default function Courses({db}){

    const [courses, setCourses] = useState();
    const [searchCourse, setSearchCourse] = useState();
    const [addCourse, setAddCourse] = useState();

    // Get all courses from the db
    async function getAllCoursesFunc (e){
        e.preventDefault()
        
        //"Bring me, from the collection 'courses' the document with name/value 'all_courses'"
        const ref = doc(db, "courses", "all_courses"); 
        const res = await getDoc(ref);

        if (res.exists()) {
            // This part just make your response look more like a JSON and less like a text
            var ugly = JSON.stringify(res.data());
            var obj = JSON.parse(ugly);
            var pretty = JSON.stringify(obj, undefined, 4);
            // Save response to a string state
            setCourses(pretty)
        } else {
            console.log("No such document!");
        }
    }

    // Search course in the db
    async function searchCourseFunc(e) {
        e.preventDefault()

        //"Bring me, from the collection 'courses' the document with name/value 'all_courses'"
        const ref = doc(db, "courses", "all_courses");
        const res = await getDoc(ref);

        if (res.exists()) {
            // From the all the courses (res.data()) filter these courses that course.name includes searchCourse
            const filtered = Object.values(res.data()).filter(course => course.name.includes(searchCourse));

            var ugly = JSON.stringify(filtered);
            var obj = JSON.parse(ugly);
            var pretty = JSON.stringify(obj, undefined, 4);
            // Save to string state
            setCourses(pretty)
        } else {
            setCourses("No such document!")
            console.log("No such document!");
        }
    }

    // Update user data
    async function pushCourseFunc(e) {
        e.preventDefault()
        const course = {
            name: addCourse,
            grade: 0
        };
        try{
            // Get the users email from the local storage.
            const user_mail = localStorage.getItem('email')
            // For this user get all the data from the db
            const ref = doc(db, "users", user_mail)

            // The user's object has a 'courses' array. Update and push the new data in the array with arrayUnion function
            const res = await updateDoc(ref, {
                courses: arrayUnion(course)
            });

            console.log(res.status)
        }catch(e){
          console.log(e)
        }
    }

    // The useEffect runs after every render and replaces
    useEffect(()=> {
        // Every time you try to enter this page check if you have a saved key at the local storage. 
        // If not, then do not allow user to enter this page and redirect to login page
        if (localStorage.getItem('role') === null) {
            window.location.href = '/'
        }
    },[])

    return(
        <div className='courses'>
            <button onClick={logout} className='logout'>Logout</button>
            <h5 className='welcome'>Welcome {localStorage.getItem('email')}</h5>
            <div className='courses-container'>
                <h1 className='weird'>This is not a 90s website</h1>
                <h2>Search Courses</h2>
                <div className='course-row'>
                    <label>Course Name:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="text"
                        value={searchCourse}
                        onChange={(e) => setSearchCourse(e.target.value)}
                    />
                    <button onClick={searchCourseFunc}>Search</button>
                </div>
                <button style={{'marginTop': '30px'}} onClick={getAllCoursesFunc}>Get All Courses</button>
            </div>
            <textarea rows={5} cols={50} style={{'margin': '10px'}} value={courses}/ >
                <form className='add-course'>
                    <h2>Push Course for user </h2>
                    <label>Course Name:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="text"
                        value={addCourse}
                        onChange={(e) => setAddCourse(e.target.value)}
                    />
                    <button onClick={pushCourseFunc}> Add Course </button>
                </form>
        </div>
    )
}