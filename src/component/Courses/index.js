import './index.css'
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import './index.css'
import { logout } from '../../Utils/Methods';

export default function Courses({app}){

    const db = getFirestore(app);
    const [courses, setCourses] = useState();
    const [searchCourse, setSearchCourse] = useState();
    const [addCourse, setAddCourse] = useState();

    async function getAllCoursesFunc (e){
        e.preventDefault()
        
        const ref = doc(db, "courses", "all_courses"); //"Bring me, from the collection 'users' the document with name/value 'email'"
        const res = await getDoc(ref);

        if (res.exists()) {
            var ugly = JSON.stringify(res.data());
            var obj = JSON.parse(ugly);
            var pretty = JSON.stringify(obj, undefined, 4);
            setCourses(pretty)
        } else {
            console.log("No such document!");
        }
    }
    async function searchCourseFunc(e) {
        e.preventDefault()
        const ref = doc(db, "courses", "all_courses"); //"Bring me, from the collection 'users' the document with name/value 'email'"
        const res = await getDoc(ref);

        if (res.exists()) {
            const filtered = Object.values(res.data()).filter(course => course.name.includes(searchCourse));
            var ugly = JSON.stringify(filtered);
            var obj = JSON.parse(ugly);
            var pretty = JSON.stringify(obj, undefined, 4);
            setCourses(pretty)
        } else {
            setCourses("No such document!")
            console.log("No such document!");
        }
    }
    async function pushCourseFunc(e) {
        e.preventDefault()
        const course = {
            name: addCourse,
            grade: 0
        };
        try{
            const user_mail = localStorage.getItem('email')
            const ref = doc(db, "users", user_mail)

            const res = await updateDoc(ref, {
                courses: arrayUnion(course)
            });

            console.log(res.status)
        }catch(e){
          console.log(e)
        }
    }

    useEffect(()=> {
        const role = localStorage.getItem('role')
        if (role === null) {
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