import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { callApi, getCookie } from '../helpers'
import Navigation from '../layout/Navigation'
import { User } from '../types'
/**
 * This is the admin portal.
 * The admin can see students and instructor and perform admin tasks.
 * The admin should be able to view all courses and perform CRUD on any courses or modules.
 * The admin should also be able to see all users and their respective roles.
 * @returns The Admin's view
 */
const Admin = () => {
    const [isAuthenticated, setAuth] = useState(true)
    const [user, setUser] = useState<User>()
    const navigate = useNavigate()
    useEffect(() => {
        //
        try {
            const person = JSON.parse(getCookie('user')!)
            if (person.user[0] != null) {
                if (person.user[0].role == 'admin') {
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
        if (isAuthenticated) {
            if (user?.role == 'admin') {
                const myHeaders = new Headers()
                //myHeaders.append('x-auth-token', sessionStorage.getItem('token')!)
                myHeaders.append('x-auth-token', getCookie('token'))
                const requestOptions: RequestInit = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow',
                }

                void fetch('https://kula-learn-server.herokuapp.com/api/admin/administrators', requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        try {
                            const wrapper = document.getElementById('administrators')
                            const heading = document.createElement('h3')
                            heading.innerText = 'Administrators'
                            wrapper?.append(heading)
                            result.forEach((element: User, i: any) => {
                                const container = document.createElement('div')
                                container.innerText = `${i + 1} ${element.firstName} ${
                                    element.lastName
                                } ${element.email}`
                                wrapper?.append(container)
                            })
                        } catch {
                            navigate('/login')
                        }
                    })
            } else if (user?.role == 'instructor') {
                navigate('/instructor')
            } else if (user?.role == 'student') {
                navigate('/student')
            }
        } else {
            navigate('/login')
        }
    }, [user])
    useEffect(() => {
        if (isAuthenticated) {
            if (user?.role == 'admin') {
                const myHeaders = new Headers()
                //myHeaders.append('x-auth-token', sessionStorage.getItem('token')!)
                myHeaders.append('x-auth-token', getCookie('token'))
                const requestOptions: RequestInit = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow',
                }

                void fetch('https://kula-learn-server.herokuapp.com/api/admin/instructors', requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        try {
                            const wrapper = document.getElementById('instructors')
                            const heading = document.createElement('h3')
                            heading.innerText = 'Instructors'
                            wrapper?.append(heading)
                            result.forEach((element: User, i: any) => {
                                const container = document.createElement('p')
                                const btn = document.createElement('button')
                                const btnRole = document.createElement('button')
                                const btnAdmin = document.createElement('button')
                                btnRole.className = 'btn'
                                btnRole.innerText = 'Make Student'
                                btnAdmin.className = 'btn'
                                btnAdmin.innerText = 'Add as admin'
                                btnAdmin.onclick = () => {
                                    const raw = JSON.stringify({
                                        ID: `${element?.ID}`,
                                        role: 'admin',
                                    })
                                    void callApi('auth/roles', 'PUT', true, raw)
                                }
                                btnRole.onclick = () => {
                                    const raw = JSON.stringify({
                                        ID: `${element?.ID}`,
                                        role: 'student',
                                    })
                                    void callApi('auth/roles', 'PUT', true, raw)
                                }
                                if (element.disabled == 'false') {
                                    btn.className = 'btn btn-danger'
                                    btn.innerText = 'Disable Account'
                                    btn.onclick = () => {
                                        const raw = JSON.stringify({
                                            ID: `${element?.ID}`,
                                            disabled: 'true',
                                        })
                                        void callApi('auth/users', 'PUT', true, raw)
                                    }
                                } else {
                                    btn.className = 'btn'
                                    btn.innerText = 'Enable Account'
                                    btn.onclick = () => {
                                        const raw = JSON.stringify({
                                            ID: `${element?.ID}`,
                                            disabled: 'false',
                                        })
                                        void callApi('auth/users', 'PUT', true, raw)
                                    }
                                }
                                container.innerText = `${i + 1} ${element.firstName} ${
                                    element.lastName
                                } ${element.email}`
                                wrapper?.append(container)
                                wrapper?.append(btn)
                                wrapper?.append(btnRole)
                                wrapper?.append(btnAdmin)
                            })
                        } catch {
                            navigate('/login')
                        }
                    })
            } else if (user?.role == 'instructor') {
                navigate('/instructor')
            } else if (user?.role == 'student') {
                navigate('/student')
            }
        }
    }, [user])
    useEffect(() => {
        if (isAuthenticated) {
            if (user?.role == 'admin') {
                const myHeaders = new Headers()
                //myHeaders.append('x-auth-token', sessionStorage.getItem('token')!)
                myHeaders.append('x-auth-token', getCookie('token'))
                const requestOptions: RequestInit = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow',
                }

                void fetch('https://kula-learn-server.herokuapp.com/api/admin/students', requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        try {
                            const wrapper = document.getElementById('students')
                            const heading = document.createElement('h3')
                            heading.innerText = 'Students'
                            wrapper?.append(heading)
                            result.forEach((element: User, i: any) => {
                                const container = document.createElement('div')
                                container.innerText = `${i + 1} ${element.firstName} ${
                                    element.lastName
                                } ${element.email}`
                                wrapper?.append(container)
                                const btn = document.createElement('button')
                                const btnRole = document.createElement('button')
                                btnRole.className = 'btn'
                                btnRole.innerText = 'Make Instructor'
                                btnRole.onclick = () => {
                                    const raw = JSON.stringify({
                                        ID: `${element?.ID}`,
                                        role: 'instructor',
                                    })
                                    void callApi('auth/roles', 'PUT', true, raw)
                                }
                                if (element.disabled == 'false') {
                                    btn.className = 'btn btn-danger'
                                    btn.innerText = 'Disable Account'
                                    btn.onclick = () => {
                                        const raw = JSON.stringify({
                                            ID: `${element?.ID}`,
                                            disabled: 'true',
                                        })
                                        void callApi('auth/users', 'PUT', true, raw)
                                    }
                                } else {
                                    btn.innerText = 'Enable Account'
                                    btn.className = 'btn'
                                    btn.onclick = () => {
                                        const raw = JSON.stringify({
                                            ID: `${element?.ID}`,
                                            disabled: 'false',
                                        })
                                        void callApi('auth/users', 'PUT', true, raw)
                                    }
                                }
                                wrapper?.append(btn)
                                wrapper?.append(btnRole)
                            })
                        } catch {
                            navigate('/login')
                        }
                    })
            } else if (user?.role == 'instructor') {
                navigate('/instructor')
            } else if (user?.role == 'student') {
                navigate('/student')
            }
        }
    }, [user])
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
            <div id="students"></div>
            <div id="instructors"></div>
            <div id="administrators"></div>
            <div id="courses"></div>
        </>
    )
}
export default Admin