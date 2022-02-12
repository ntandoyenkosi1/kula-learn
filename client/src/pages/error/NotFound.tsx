import { useNavigate } from 'react-router-dom'
import error from '../assets/computer.png'
const NotFound = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return (
        <>
            <h1>Page Not Found</h1>
            <div>
                <button className="btn" onClick={goBack}>
                    Go To Previous Page
                </button>
            </div>
            <img style={{ maxWidth: '90%' }} src={error} />
        </>
    )
}
export default NotFound
