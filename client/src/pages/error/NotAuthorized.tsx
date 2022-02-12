import error from '../assets/computer.png'
import LoginButton from '../auth/LoginButton'
const NotAuthorized = () => {
    return (
        <>
            <h1>Not Authorized</h1>
            <h3>Please login to proceed</h3>
            <img style={{ maxWidth: '300px', maxHeight: '300px' }} src={error} />
            <div>
                <LoginButton />
            </div>
        </>
    )
}
export default NotAuthorized
