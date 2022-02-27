import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { callApi, getCookie } from '../helpers'
import Footer from '../layout/Footer'
import Main from '../layout/Main'
import { User } from '../types'
import Toaster from '../layout/Toaster'
const Profile = () => {
    const [isAuthenticated, setAuth] = useState(true)
    const [toastShow, setToastShow] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
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
    const handleFileUpload = (e: any) => {
        const formdata = new FormData()
        formdata.append('image', e.target?.files[0], e.target?.files[0].name)

        const requestOptions: RequestInit = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        }

        void fetch(
            'https://api.imgbb.com/1/upload?key=8d0a7e3689b931e211b03dbd58eab571',
            requestOptions
        )
            .then((response) => response.json())
            .then((result: any) => {
                setToastMessage('Profile image successfully updated.')
                setToastShow(true)
                const raw = JSON.stringify({
                    picture: result.data?.display_url,
                })
                void callApi('api/user', 'PUT', true, raw)
            })
    }
    return (
        <div>
            <Toaster message={toastMessage} display={toastShow} />
            <Main origin="Profile" />
            <Alert className="custom-alert">
                <Alert.Heading as="h2">Profile Information</Alert.Heading>
                <h3>
                    {user?.firstName} {user?.lastName}
                </h3>
            </Alert>
            <div className="row align-items-center profile-header">
                <div className="">
                    <img
                        src={user?.picture}
                        style={{ maxHeight: '190px', maxWidth: '190px' }}
                        alt="Profile"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">
                        Update Profile Image
                    </label>
                    <input
                        className="form-control form-control-sm"
                        onChange={handleFileUpload}
                        id="file"
                        type="file"
                    />
                </div>
                <div className="col-md text-center text-md-left">
                    Email:{' '}
                    <p className="">
                        <b>{user?.email}</b>
                    </p>
                </div>
            </div>
            <div className="row" style={{ textAlign: 'left' }}>
                <pre className="col-12 text-light bg-dark p-4">{JSON.stringify(user, null, 2)}</pre>
            </div>
            <button className="btn">Edit Profile</button>
            <Footer />
        </div>
    )
}
export default Profile
