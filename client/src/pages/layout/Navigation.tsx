import { Dropdown, Navbar } from 'react-bootstrap'
import LoginButton from '../auth/LoginButton'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCookie } from '../helpers'
import { User } from '../types'
const Navigation = () => {
    const [isAuthenticated, setAuth] = useState(true)
    const [user, setUser] = useState<User>()
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear()
        document.cookie.split(';').forEach(function (c) {
            document.cookie =
                c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        })
        navigate('/')
    }
    useEffect(() => {
        try {
            const person = JSON.parse(getCookie('user')!)
            setUser(person.user[0])
            if (person.user[0] != null) {
                setAuth(true)
            } else {
                setAuth(false)
            }
        } catch {
            setAuth(false)
        }
    }, [isAuthenticated])
    if (isAuthenticated) {
        return (
            <div>
                {/**
                 * Return NavBar with user info here. Without login and register. Include progress.
                 */}
                <Navbar>
                    <img
                        src="https://i.ibb.co/1GgrKCJ/goat.png"
                        alt="logo"
                        className="rounded mx-auto d-block"
                        style={{ width: '90px', height: '90px' }}
                        onClick={() => navigate('/')}
                    />
                    <Navbar.Brand>
                        <h1 style={{ color: 'white' }}>Kula Learn</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Dropdown drop="start">
                                <Dropdown.Toggle variant="secondary">Account</Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => navigate('/profile')}>
                                        Profile
                                    </Dropdown.Item>
                                    {user?.role == 'admin' ? (
                                        <>
                                            <Dropdown.Item onClick={() => navigate('/admin')}>
                                                Manage Users
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => navigate('/instructor')}>
                                                Manage courses
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => navigate('/courses')}>
                                                View courses
                                            </Dropdown.Item>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {user?.role == 'instructor' ? (
                                        <>
                                            <Dropdown.Item onClick={() => navigate('/instructor')}>
                                                Manage courses
                                            </Dropdown.Item>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {user?.role == 'student' ? (
                                        <>
                                            <Dropdown.Item onClick={() => navigate('/student')}>
                                                Student Portal
                                            </Dropdown.Item>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    } else {
        return (
            <div>
                <Navbar>
                    <img
                        src="https://i.ibb.co/1GgrKCJ/goat.png"
                        alt="logo"
                        className="rounded mx-auto d-block"
                        style={{ width: '90px', height: '90px' }}
                        onClick={() => navigate('/')}
                    />
                    <Navbar.Brand>
                        <h1 style={{ color: 'white' }}>Kula Learn</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a
                                className="button text-center fs-5 w3-large"
                                style={{ color: 'white' }}
                            >
                                <LoginButton />
                            </a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
export default Navigation
