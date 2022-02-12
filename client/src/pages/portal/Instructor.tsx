import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { callApi, getCookie } from '../helpers'
import Navigation from '../layout/Navigation'
import { Course, User } from '../types'
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
    const [modalShow, setModalShow] = useState(false)
    const [id, setID] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        //
        try {
            const person = JSON.parse(getCookie('user')!)
            if (person.user[0] != null) {
                if (person.user[0].role == 'instructor' || person.user[0].role == 'admin') {
                    setUser(person.user[0])
                    setAuth(true)
                } else {
                    setAuth(false)
                    navigate('/error')
                }
            } else {
                setAuth(false)
                navigate('/error')
            }
        } catch {
            setAuth(false)
            navigate('/error')
        }
    }, [isAuthenticated])
    useEffect(() => {
        if (user) {
            const myHeaders = new Headers()
            myHeaders.append('x-auth-token', getCookie('token'))
            const requestOptions: RequestInit = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            }
            void fetch('https://kula-learn-server.herokuapp.com/courses/', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    let existing = document.getElementById('cards-li')
                    existing!.innerHTML = ''
                    existing!.className = 'flexbox-container'
                    result.forEach((res: Course) => {
                        existing = document.getElementById('cards-li')
                        const wrapper = document.createElement('div')
                        const heading = document.createElement('h3')
                        const paragraph = document.createElement('div')
                        const image = document.createElement('img')
                        const preview = document.createElement('button')
                        const enrol = document.createElement('button')
                        const edit = document.createElement('button')
                        const del = document.createElement('button')
                        const pub = document.createElement('button')
                        const visibility = document.createElement('p')
                        const vis = document.createElement('button')
                        const buttonWrapper = document.createElement('div')
                        const enrolled = document.createElement('p')
                        const created = document.createElement('p')
                        const manageUsers = document.createElement('button')
                        const date = new Date(res.createdAt * 1000)
                        created.innerHTML = `Created at ${date.getFullYear()}-${
                            date.getMonth() + 1
                        }-${date.getDate()}`
                        wrapper.className = 'shadow p-3 mb-5 bg-body rounded offset'
                        heading.innerText = res.title
                        paragraph.innerText = res.shortDescription
                        image.src = res.imageUrl
                        image.style.maxHeight = '115px'
                        image.className = 'rounded mx-auto d-block'
                        preview.innerText = 'Preview'
                        preview.className = 'btn'
                        buttonWrapper.className = 'd-grid gap-2 col-6 mx-auto'
                        enrol.innerText = 'Enrol'
                        enrol.className = 'btn'
                        edit.innerText = 'Edit'
                        edit.className = 'btn'
                        manageUsers.innerText = 'Manage Users'
                        manageUsers.className = 'btn btn-secondary'
                        manageUsers.onclick = () => {
                            setID(res.collectionID)
                            setModalShow(true)
                        }
                        if (res.visibility == 'public') {
                            pub.className = 'btn'
                            vis.className = 'btn'
                            visibility.innerText = 'Public'
                            vis.innerText = 'Make Private'
                            const raw = JSON.stringify({
                                ID: res?.ID,
                                visibility: 'private',
                            })
                            vis.onclick = () => {
                                void callApi('courses/enable', 'PUT', true, raw)
                            }
                        } else if (res.visibility == 'private') {
                            pub.className = 'btn'
                            vis.className = 'btn'
                            visibility.innerText = 'Private'
                            vis.innerText = 'Make Public'
                            const raw = JSON.stringify({
                                ID: res?.ID,
                                visibility: 'public',
                            })
                            vis.onclick = () => {
                                void callApi('courses/enable', 'PUT', true, raw)
                            }
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
                        preview.onclick = async () => {
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
                        del.className = 'btn'
                        //buttonWrapper.append(preview)
                        if (user?.role == 'instructor' || user?.role == 'admin') {
                            buttonWrapper.append(preview)
                            buttonWrapper.append(del)
                            buttonWrapper.append(edit)
                            if (res.published == 'true') {
                                const raw = JSON.stringify({
                                    ID: `${res?.ID}`,
                                    published: 'false',
                                })
                                pub.innerText = 'Unpublish course'
                                pub.onclick = () => {
                                    void callApi('courses/publish', 'PUT', true, raw)
                                }
                                buttonWrapper.append(pub)
                            } else if (res.published == 'false') {
                                const raw = JSON.stringify({
                                    ID: `${res?.ID}`,
                                    published: 'true',
                                })
                                pub.innerText = 'Unpublish course'
                                pub.onclick = () => {
                                    void callApi('courses/publish', 'PUT', true, raw)
                                }
                                pub.innerText = 'Publish Course'
                                buttonWrapper.append(pub)
                            }
                        }
                        const myHeaders = new Headers()
                        myHeaders.append('x-auth-token', getCookie('token'))
                        //myHeaders.append('x-auth-token', sessionStorage.getItem('token')!)
                        myHeaders.append('Content-Type', 'application/json')
                        const raw = JSON.stringify({
                            courseID: `${res.collectionID}`,
                        })
                        const requestOptions: RequestInit = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow',
                        }

                        void fetch('https://kula-learn-server.herokuapp.com/courses/enrolled', requestOptions)
                            .then((response) => response.json())
                            .then((reso) => {
                                enrolled.innerText = `Enrolled users: ${reso[0]['COUNT(userID)']}`
                            })
                        wrapper.append(heading)
                        wrapper.append(image)
                        wrapper.append(paragraph)
                        wrapper.append(buttonWrapper)
                        wrapper.append(created)
                        wrapper.append(enrolled)
                        wrapper.append(visibility)
                        wrapper.append(vis)
                        wrapper.append(manageUsers)
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
            myHeaders.append('x-auth-token', getCookie('token'))
            //myHeaders.append('x-auth-token', sessionStorage.getItem('token')!)
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

            void fetch('https://kula-learn-server.herokuapp.com/api/enrol', requestOptions)
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

                        void fetch('https://kula-learn-server.herokuapp.com/api/course/get', requestOptions)
                            .then((response) => response.json())
                            .then((result: any) => {
                                const d = document.createElement('div')
                                const paragraph = document.createElement('p')
                                const btn = document.createElement('button')
                                paragraph.innerText = result[0]?.title
                                btn.onclick = () => {
                                    navigate(`/course/${l}`, { replace: false })
                                }
                                btn.className = 'btn'
                                btn.innerText = 'View'
                                paragraph.append(btn)
                                d.append(paragraph)
                                wrapper?.append(d)
                            })
                    })
                })
        }
    }, [user])
    function UsersModal(props: any) {
        if (props && props.Id) {
            const myHeaders = new Headers()
            myHeaders.append('x-auth-token', getCookie('token'))
            //myHeaders.append('x-auth-token', sessionStorage.getItem('token')!)
            const requestOptions: RequestInit = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            }
            void fetch('https://kula-learn-server.herokuapp.com/api/admin/students', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    try {
                        const container = document.getElementById('users')
                        const temp = document.createElement('span')
                        temp.innerText = 'Hello'
                        container?.append(temp)
                        container!.innerText = ''
                        result.forEach((element: User, i: any) => {
                            const wrapper = document.createElement('div')
                            const counter = document.createElement('span')
                            const fname = document.createElement('span')
                            const lname = document.createElement('span')
                            const email = document.createElement('span')
                            const enrol = document.createElement('button')
                            counter.innerText = i + 1
                            fname.innerText = element.firstName
                            lname.innerText = element.lastName
                            email.innerText = element.email
                            const myHeaders = new Headers()
                            myHeaders.append('x-auth-token', getCookie('token'))
                            //myHeaders.append('x-auth-token', sessionStorage.getItem('token')!)
                            myHeaders.append('Content-Type', 'application/json')

                            const raw = JSON.stringify({
                                ID: element.ID,
                                courseID: props.Id,
                            })
                            const requestOptions: RequestInit = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow',
                            }
                            void fetch('https://kula-learn-server.herokuapp.com/courses/check', requestOptions)
                                .then((response) => response.json())
                                .then((result: any) => {
                                    if (result) {
                                        enrol.innerText = 'Remove from course'
                                        enrol.className = 'btn'
                                        const raw = JSON.stringify({
                                            userID: element.ID,
                                            courseID: props.Id,
                                        })
                                        enrol.onclick = () => {
                                            void callApi('api/enrol', 'DELETE', true, raw)
                                        }
                                    } else {
                                        enrol.innerText = 'Enrol to course'
                                        enrol.className = 'btn'
                                        const raw = JSON.stringify({
                                            userID: element.ID,
                                            courseID: props.Id,
                                        })
                                        enrol.onclick = () => {
                                            void callApi('api/enrol', 'POST', true, raw)
                                        }
                                    }
                                })
                            wrapper.append(counter)
                            wrapper.append(fname)
                            wrapper.append(lname)
                            wrapper.append(email)
                            wrapper.append(enrol)
                            container?.append(wrapper)
                        })
                    } catch {
                        //
                    }
                })
        }
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Assign users to course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="users"></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <>
            <div className="w3-main" style={{ marginLeft: '210px' }}></div>
            <div className="bg-new">
                <button
                    className="w3-button bg-new w3-xlarge w3-hide-large"
                    onClick={() => (document.getElementById('mySidebar')!.style.display = 'block')}
                >
                    &#9776;
                </button>
                <div className="w3-container">
                    <Navigation />
                </div>
            </div>
            <>
                <h1>Your progress</h1>
                <h3>Role: Instructor</h3>
                <h5>Courses you have created will appear below</h5>
                <button className="btn wide wider" onClick={() => navigate('/courses/create')}>
                    Create New Course
                </button>
                <div className="">
                    <div>
                        <div id="cards-li" style={{ textAlign: 'center' }}></div>
                    </div>
                </div>
            </>
            <div>
                <div id="cards-li" style={{ textAlign: 'center' }}></div>
            </div>
            <UsersModal show={modalShow} Id={id} onHide={() => setModalShow(false)} />
        </>
    )
}
export default Instructor
