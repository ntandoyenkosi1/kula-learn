import { Navbar } from 'react-bootstrap'
import LogoutButton from '../auth/LogoutButton'
import LoginButton from '../auth/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'
const Navigation = () => {
    const { isAuthenticated } = useAuth0()

    if (isAuthenticated) {
        return (
            <div>
                {/**
                 * Return NavBar with user info here. Without login and register. Include progress.
                 */}
                <Navbar>
                    <Navbar.Brand>
                        <h1 style={{ color: 'white' }}>Kula Learn</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a
                                href="#home"
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
                    />
                    <Navbar.Brand>
                        <h1 style={{ color: 'white' }}>Kula Learn</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a
                                href="#home"
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
