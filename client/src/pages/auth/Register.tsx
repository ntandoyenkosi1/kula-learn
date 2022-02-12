import { useNavigate } from 'react-router-dom'
import Navigation from '../layout/Navigation'

const Register = () => {
    const navigate = useNavigate()
    const handleRegister = () => {
        const firstName = document.getElementById('firstName') as HTMLInputElement
        const lastName = document.getElementById('lastName') as HTMLInputElement
        const email = document.getElementById('email') as HTMLInputElement
        const password = document.getElementById('password') as HTMLInputElement
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const role = document.getElementById('roleSelect') as HTMLSelectElement
        if (firstName.value == '') {
            firstName.reportValidity()
            return
        }
        if (lastName.value == '') {
            lastName.reportValidity()
            return
        }
        if (email.value == '') {
            email.reportValidity()
            return
        }
        if (password.value == '') {
            password.reportValidity()
            return
        }
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify({
            firstName: `${firstName.value}`,
            lastName: `${lastName.value}`,
            email: `${email.value}`,
            password: `${password.value}`,
            role:`${role.value}`
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        void fetch('https://kula-learn-server.herokuapp.com/api/user', requestOptions)
            .then((response) => response.json())
            .then(() => {
                //
                navigate('/login')
            })
        //.catch(error => console.log('error', error));
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
            <div className="page shadow p-3 mb-5 bg-body rounded">
                <h3>Register</h3>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        id="firstName"
                        className="form-control"
                        placeholder="First name"
                        required
                    />
                    <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="password"
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="roleSelect">
                        You are a:
                    </label>
                    <select className="form-select" id="roleSelect" required>
                        <option selected>Choose... </option>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </select>
                </div>
                <p>
                    <input
                        type="button"
                        onClick={handleRegister}
                        className="btn wide"
                        value="Register"
                    />
                </p>
            </div>
        </>
    )
}
export default Register
