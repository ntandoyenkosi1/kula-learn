import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Navigation from '../layout/Navigation'

const Login = () => {
    const navigate = useNavigate()
    const [modalShow, setModalShow]=useState(false)
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
            password:`${password.value}`
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        void fetch('http://localhost:4000/api/user/get', requestOptions)
            .then((response) => {
                if(response.ok){
                    return response.json()
                }
                else{
                    //
                    setModalShow(true)
                    return
                }
            })
            .then((result) => {
                if(result){
                    document.cookie=`user=${JSON.stringify(result)}; max-age=43200;`
                    document.cookie=`token=${result.token}; max-age=43200;`
                    navigate('/')
                }
                // sessionStorage.setItem('user', JSON.stringify(result))
                // sessionStorage.setItem('token', result.token)
            })
        //.catch(error => console.log('error', error));
    }
    return (
        <>
            <div className="w3-main" style={{ marginLeft: '210px' }}></div>
            <div className="bg-new">
                {/* <button
                    className="w3-button bg-new w3-xlarge w3-hide-large"
                    onClick={() => (document.getElementById('mySidebar')!.style.display = 'block')}
                >
                    &#9776;
                </button> */}
                <div className="w3-container">
                    <Navigation />
                </div>
            </div>
            <ErrorModal show={modalShow} onHide={() => setModalShow(false)} />
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
                        className="btn wide"
                        value="Login"
                    />
                </p>
                <p>
                    New to Kula. click here{' '}
                    <button className="btn" onClick={() => navigate('/register')}>
                        Register
                    </button>
                </p>
            </div>
        </>
    )
}
export default Login
    function ErrorModal(props: any) {
        return (
            <Modal {...props} size="lg"centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    An error occured. Make sure that your email and password are correct.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }