import { Link } from 'react-router-dom'
const Footer = () => {
    const isAuth = false
    return (
        <div>
            <div>
                &nbsp; &nbsp;
                <span className="footer1">
                    <Link className="footer1" to="/">
                        Home
                    </Link>
                </span>
                &nbsp;
                <span className="footer1">
                    <Link className="footer1" to="/courses">
                        Courses
                    </Link>
                </span>
                &nbsp;
                {isAuth ? (
                    <>
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
