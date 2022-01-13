import { useNavigate } from 'react-router-dom'
import Navigation from '../layout/Navigation'

const Login = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        const email = document.getElementById('email') as HTMLInputElement
        const password = document.getElementById('password') as HTMLInputElement
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
            email: `${email.value}`,
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        void fetch('https://kula-learn-server.herokuapp.com/api/user/get', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                //console.log(result)
                sessionStorage.setItem('user', JSON.stringify(result))
                navigate('/')
            })
        //.catch(error => console.log('error', error));
    }
    return (
        <>
            <div className="w3-main" style={{ marginLeft: '210px' }}></div>
            <div className="w3-teal">
                <button
                    className="w3-button w3-teal w3-xlarge w3-hide-large"
                    onClick={() => (document.getElementById('mySidebar')!.style.display = 'block')}
                >
                    &#9776;
                </button>
                <div className="w3-container">
                    <Navigation />
                </div>
            </div>
            <div className="page shadow p-3 mb-5 bg-body rounded">
                <h3>Login</h3>
                <div className="input-group mb-3">
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="password"
                        required
                    />
                </div>
                <p>
                    <input
                        type="button"
                        onClick={handleLogin}
                        className="btn btn-success wide"
                        value="Login"
                    />
                </p>
                <p>
                    New to Kula. click here{' '}
                    <button className="btn btn-success" onClick={() => navigate('/register')}>
                        Register
                    </button>
                </p>
            </div>
        </>
    )
}
export default Login
