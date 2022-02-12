import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../helpers'
import { User } from '../types'
const Footer = () => {
    const [isAuthenticated, setAuth] = useState(true)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, setUser] = useState<User>()
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
    return (
        <div>
            <div>
                &nbsp; &nbsp;
                <span className="footer1">
                    <Link className="footer1" to="/">
                        Home
                    </Link>
                </span>
                {isAuthenticated ? (
                    <>
                        &nbsp;
                        <span className="footer1">
                            <Link className="footer1" to="/courses">
                                Courses
                            </Link>
                        </span>
                        &nbsp;
                        <span className="footer1">
                            <Link className="footer1" to="/profile">
                                Profile
                            </Link>
                        </span>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
export default Footer
