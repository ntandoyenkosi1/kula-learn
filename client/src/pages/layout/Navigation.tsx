import { Navbar } from 'react-bootstrap'
import LogoutButton from '../auth/LogoutButton'
import LoginButton from '../auth/LoginButton'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const Navigation = () => {
    const [isAuthenticated, setAuth] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(sessionStorage!.getItem('user')!)
        if (user == null) {
            setAuth(false)
        } else {
            setAuth(true)
        }
    }, [isAuthenticated])
    if (isAuthenticated) {
        return (
            <div>
                {/**
                 * Return NavBar with user info here. Without login and register. Include progress.
                 */}
                <Navbar>
                    <Navbar.Brand>
                        <h1 onClick={() => navigate('/')} style={{ color: 'white' }}>
                            Kula Learn
                        </h1>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a
                                className="button text-center fs-5 w3-large"
                                style={{ color: 'white' }}
                            >
                                <LogoutButton />
                            </a>
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
