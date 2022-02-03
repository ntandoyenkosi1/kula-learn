import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { callApi } from '../helpers'
import Navigation from '../layout/Navigation'
import { User } from '../types'
/**
 * The instructor view should show this view to instructors only.
 * The instructor should be able to see all courses and modules that they created.
 * The instructor should be able to create new courses and modules as well as publish a course so that it's visible to everyone.
 * The instructor should be able to see how many users are enrolled in a particular course only.
 * @returns Instructor View
 */
const Instructor = () => {
    const [isAuthenticated, setAuth] = useState(false)
    const [user, setUser] = useState<User>()
    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //const [enrolledCourses, setEnrolledCourses] = useState<Course>()
    useEffect(() => {
        //
        const person = JSON.parse(sessionStorage!.getItem('user')!)
        try {
            setUser(person[0])
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
        //
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify({
            uploader: user?.email,
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        void fetch('http://localhost:4000/api/user/instructor', requestOptions)
            .then((response) => response.json())
            .then((result) =>{
                result
            } )
            //.catch((error) => console.log('error', error))
    }, [user])
    useEffect(() => {
        if (user) {
            const requestOptions: RequestInit = {
                method: 'GET',
                redirect: 'follow',
            }
            void fetch('https://kula-learn-server.herokuapp.com/courses/', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    ///console.log(result)
                    let existing = document.getElementById('cards-li')
                    existing!.innerHTML = ''
                    // existing!.className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3"
                    existing!.className = 'flexbox-container'
                    result.forEach((res: any) => {
                        //
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
                        preview.onclick=async ()=>{
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
                        //buttonWrapper.append(preview)
                        if (user?.role == 'instructor') {
                            buttonWrapper.append(preview)
                            buttonWrapper.append(del)
                            buttonWrapper.append(edit)
                        } else {
                            //
                        }
                        wrapper.append(heading)
                        wrapper.append(image)
                        wrapper.append(paragraph)
                        wrapper.append(buttonWrapper)
                        existing!.append(wrapper)
                        wrapper!.onclick = () => {
                            /*console.log(res.title)*/
                        }
                    })
                })
        }
    }, [user])
    useEffect(() => {
        if (user) {
            const myHeaders = new Headers()
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
                    const set = new Set()
                    result.forEach((t: string) => {
                        set.add(t)
                    })
                    const list = Array.from(set)
                    const wrapper = document.getElementById('enrolled-courses')
                    list.forEach((l: any) => {
                        const myHeaders = new Headers()
                        myHeaders.append('Content-Type', 'application/json')

                        const raw = JSON.stringify({
                            id: l,
                        })

                        const requestOptions: RequestInit = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow',
                        }

                        void fetch(
                            'http://localhost:4000/api/course/get',
                            requestOptions
                        )
                            .then((response) => response.json())
                            .then((result: any) => {
                                const d = document.createElement('div')
                                const paragraph = document.createElement('p')
                                const btn = document.createElement('button')
                                paragraph.innerText = result[0]?.title
                                btn.onclick = () => {
                                    navigate(`/course/${l}`, { replace: false })
                                }
                                btn.className = 'btn btn-success'
                                btn.innerText = 'View'
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
        <>
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
            {isAuthenticated ? (
                <>
                    <p>Authenticated</p>
                    {user && user.role == 'instructor' ? (
                        <>
                            <h1>Your progress</h1>
                            <h3>Role: Instructor</h3>
                            <h5>Courses you have created will appear below</h5>
                            <button
                                className="btn btn-primary wide wider"
                                onClick={() => navigate('/courses/create')}
                            >
                                Create New Course
                            </button>
                            <div className="">
                                <p>
                                    <div id="cards-li" style={{ textAlign: 'center' }}></div>
                                </p>
                            </div>
                        </>
                    ) : (
                        <>You are not authorized to view this page</>
                    )}
                </>
            ) : (
                <>
                    <p>Not Authenticated</p>
                </>
            )}
        </>
    )
}
export default Instructor