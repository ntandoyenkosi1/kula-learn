import { useEffect, useState } from 'react'
import { Alert, Card, CardGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { callApi } from '../helpers'
import Footer from '../layout/Footer'
import Navigation from '../layout/Navigation'
import { Course, User } from '../types'
// interface Course {
//     ID: string
//     title: string
// }
const Courses = () => {
    const navigate = useNavigate()
    const [isAuthenticated, setAuth] = useState(true)
    const [user, setUser] = useState<User>()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [enrolledCourses, setEnrolledCourses] = useState<Course>()
    useEffect(() => {
        //
        const person = JSON.parse(sessionStorage!.getItem('user')!)
        try {
            setUser(person.user[0])
            if (person[0] != null) {
                setAuth(true)
            } else {
                setAuth(false)
            }
        } catch {
            setAuth(false)
        }
    }, [isAuthenticated])
    useEffect(() => {
        if (user) {
            const myHeaders = new Headers()
            //console.log(sessionStorage.getItem("token"))
            myHeaders.append("x-auth-token", sessionStorage.getItem("token")!);
            const requestOptions: RequestInit = {
                method: 'GET',
                redirect: 'follow',
                headers:myHeaders
            }
            void fetch('http://localhost:4000/courses/', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    //console.log("Result:", result)
                    if(result.ok==false){
                        navigate('/login')
                        return
                    }
                    let existing = document.getElementById('cards-li')
                    existing!.innerHTML = ''
                    // existing!.className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3"
                    existing!.className = 'flexbox-container'
                    result.forEach((res: any) => {
                        //
                        //console.log(result)
                        existing = document.getElementById('cards-li')
                        const wrapper = document.createElement('div')
                        const heading = document.createElement('h3')
                        const paragraph = document.createElement('p')
                        const image = document.createElement('img')
                        const preview = document.createElement('button')
                        const enrol = document.createElement('button')
                        const edit = document.createElement('button')
                        const del = document.createElement('button')
                        const buttonWrapper = document.createElement('div')
                        const created=document.createElement("span")
                        const modified=document.createElement("span")
                        wrapper.className = 'shadow p-3 mb-5 bg-body rounded offset'
                        heading.innerText = res.title
                        paragraph.innerText = res.shortDescription
                        image.src = res.imageUrl
                        image.style.maxHeight = '115px'
                        image.className = 'rounded mx-auto d-block'
                        preview.innerText = 'Preview'
                        preview.className = 'btn btn-primary'
                        buttonWrapper.className = 'd-grid gap-2 col-6 mx-auto'
                        enrol.innerText = 'Enrol'
                        enrol.className = 'btn btn-primary'
                        edit.innerText = 'Edit'
                        edit.className = 'btn btn-primary'
                        const d=new Date(result[0].createdAt*1000)
                        created.innerText=`Created at: ${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
                        modified.innerText=`\nLast modified by: Instructor`
                        preview.onclick=()=>{
                            navigate(`/course/${res.collectionID}`)
                        }
                        edit.onclick = () => {
                            //
                            navigate(`/course/edit/${res.ID}`)
                        }
                        enrol.onclick = async () => {
                            const raw = JSON.stringify({
                                userID: user?.ID,
                                courseID: res?.collectionID,
                            })
                            await callApi('api/enrol', 'POST', true, raw)
                            navigate(`/course/${res.collectionID}`)
                        }
                        del.onclick = () => {
                            /**@function  */
                            const raw = JSON.stringify({
                                id: `${res.ID}`,
                                collectionID: `${res.collectionID}`,
                            })

                            void callApi('course', 'DELETE', true, raw)
                        }
                        del.innerText = 'Delete'
                        del.className = 'btn btn-primary'
                        if(user?.role=="student"){
                            buttonWrapper.append(enrol)
                        }
                        if (user?.role == 'instructor' || user?.role=='admin') {
                            buttonWrapper.append(preview)
                            buttonWrapper.append(del)
                            buttonWrapper.append(edit)
                        }
                        wrapper.append(heading)
                        wrapper.append(image)
                        wrapper.append(paragraph)
                        wrapper.append(buttonWrapper)
                        if(user?.role=="admin" || user?.role=="instructor"){
                            wrapper.append(created)
                            wrapper.append(modified)
                        }
                        existing!.append(wrapper)
                        wrapper!.onclick = () => {
                            /*console.log(res.title)*/
                        }
                    })
                })
        }
    }, [user])
    useEffect(() => {
        if(user){
            const myHeaders = new Headers()
            myHeaders.append("x-auth-token", sessionStorage.getItem("token")!);
            myHeaders.append('Content-Type', 'application/json')

            const raw = JSON.stringify({
                userID: user.ID,
            })

            const requestOptions: RequestInit = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            }

            void fetch('http://localhost:4000/api/enrol', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if(result.ok==false){
                        navigate('/login')
                        return
                    }
                    const set=new Set()
                    //console.log(result)
                    result.forEach((t:string)=>{
                        set.add(t)
                    })
                    const list=Array.from(set)
                    const wrapper= document.getElementById("enrolled-courses")
                    list.forEach((l:any)=>{
                        const myHeaders = new Headers();
                        myHeaders.append("x-auth-token", sessionStorage.getItem("token")!)
                        myHeaders.append("Content-Type", "application/json");

                        const raw = JSON.stringify({
                        "id": l
                        });

                        const requestOptions:RequestInit = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                        };

                        void fetch("http://localhost:4000/api/course/get", requestOptions)
                        .then(response => response.json())
                        .then((result:any) => {
                            const d=document.createElement("div")
                            const paragraph=document.createElement("p")
                            const btn=document.createElement("button")
                            paragraph.innerText=result[0]?.title
                            btn.onclick=()=>{
                                navigate(`/course/${l}`, {replace:false})
                            }
                            btn.className="btn btn-success"
                            btn.innerText="View"
                            paragraph.append(btn)
                            d.append(paragraph)
                            wrapper?.append(d)
                        })
                    })
                })
                //.catch((error) => console.log('error', error))
        }
    }, [user])
    return (
        <div>
            <div className="w3-main" style={{ marginLeft: '210px' }}></div>
            <div className="w3-teal">
                <button
                    className="w3-button w3-teal w3-xlarge w3-hide-large"
                    onClick={() => (document.getElementById('mySidebar')!.style.display = 'block')}
                >
                    &#9776;
                </button>
                <div className="w3-container">
                    <Navigation />
                </div>
            </div>
            <Alert variant="secondary">
                <Alert.Heading>
                    <h2>
                        <b>Welcome to Kula Learn</b>
                    </h2>
                </Alert.Heading>
            </Alert>
            <div className="page-home shadow p-3 mb-5 bg-body rounded">
                <CardGroup>
                    <Card>
                        <Card.Img
                            className="img-decoration rounded mx-auto d-block"
                            variant="top"
                            src="https://i.ibb.co/ZBYYGj0/course.png"
                        />
                        <Card.Body>
                            <Card.Title className="align-center">Browse</Card.Title>
                            <Card.Text className="align-center">
                                <p>We offer beginner and more advanced courses.</p>
                                {user == null ? (
                                    <>
                                        <Card>
                                            <Card.Body>
                                                <h4>You are not logged in</h4>
                                                <p>Log in to see the courses you are enrolled in</p>
                                            </Card.Body>
                                        </Card>
                                    </>
                                ) : (
                                    <>
                                        {(user.role == 'instructor' || user.role=='admin') ? (
                                            <>
                                                <button
                                                    className="btn btn-primary wide wider"
                                                    onClick={() => navigate('/courses/create')}
                                                >
                                                    Create New Course
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {enrolledCourses ? (
                                                    <>
                                                        <Card>
                                                            <Card.Title className="align-center">
                                                                <b>Courses You Are Enrolled In</b>
                                                            </Card.Title>
                                                            <Card.Body className="align-center">
                                                                You are enrolled in some courses
                                                            </Card.Body>
                                                        </Card>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Card>
                                                            <Card.Title className="align-center">
                                                                <b>Courses You Are Enrolled In</b>
                                                            </Card.Title>
                                                            <Card.Body className="align-center">
                                                                <div id="enrolled-courses">
                                                                You are not currently enrolled in
                                                                any courses. Enrol in a course below
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
                <div className="">
                    <p>
                        <div id="cards-li" style={{ textAlign: 'center' }}>
                        </div>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Courses
