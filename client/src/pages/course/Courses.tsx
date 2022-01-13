//import { withAuthenticationRequired } from '@auth0/auth0-react'
//import Loading from '../auth/Loading'
// import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { Alert, Card, CardGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
//import Loading from '../auth/Loading'
import Footer from '../layout/Footer'
import Navigation from '../layout/Navigation'
interface User {
    firstName: string
    lastName: string
    email: string
    role: string
    createdAt: string
}
const Courses = () => {
    const navigate = useNavigate()
    const [isAuthenticated, setAuth] = useState(false)
    const [user, setUser] = useState<User>()
    useEffect(() => {
        //
        const person = JSON.parse(sessionStorage!.getItem('user')!)
        try {
            setUser(person[0])
            if (user == null) {
                setAuth(false)
            }
        } catch {
            setAuth(true)
        }
    }, [isAuthenticated])
    useEffect(() => {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow',
        }
        void fetch('https://kula-learn-server.herokuapp.com/courses/', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                ///console.log(result)
                result.forEach((res: any) => {
                    //
                    const existing = document.getElementById('cards-li')
                    const wrapper = document.createElement('div')
                    const heading = document.createElement('h3')
                    const paragraph = document.createElement('p')
                    const image = document.createElement('img')
                    const preview = document.createElement('button')
                    const enrol = document.createElement('button')
                    const edit = document.createElement('button')
                    const del = document.createElement('button')
                    const buttonWrapper = document.createElement('div')
                    wrapper.className = 'shadow p-3 mb-5 bg-body rounded'
                    heading.innerText = res.title
                    paragraph.innerText = res.shortDescription
                    image.src = res.imageUrl
                    image.style.maxHeight = '115px'
                    image.className = 'rounded mx-auto d-block'
                    preview.innerText = 'Preview'
                    preview.className = 'btn btn-primary'
                    buttonWrapper.className = 'd-grid gap-2 col-6 mx-auto'
                    enrol.innerText = 'Enrol'
                    enrol.className = 'btn btn-primary'
                    edit.innerText = 'Edit'
                    edit.className = 'btn btn-primary'
                    edit.onclick = () => {
                        //
                        navigate(`/course/edit/${res.ID}`)
                    }
                    enrol.onclick = () => {
                        navigate(`/course/${res.collectionID}`)
                    }
                    del.onclick = () => {
                        const myHeaders = new Headers()
                        myHeaders.append('Content-Type', 'application/json')
                        /**@function  */
                        const raw = JSON.stringify({
                            id: `${res.ID}`,
                            collectionID: `${res.collectionID}`,
                        })

                        const requestOptions: RequestInit = {
                            method: 'DELETE',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow',
                        }

                        void fetch('https://kula-learn-server.herokuapp.com/courses/', requestOptions).then(
                            (response) => response.json()
                        )
                        // .then((result) => {
                        //     console.log(result)
                        // })
                        // .catch((error) => console.log('error', error))
                    }
                    del.innerText = 'Delete'
                    del.className = 'btn btn-primary'
                    //buttonWrapper.append(preview)
                    buttonWrapper.append(enrol)
                    if (user?.role == 'instructor') {
                        buttonWrapper.append(del)
                        buttonWrapper.append(edit)
                    } else {
                        //
                    }
                    wrapper.append(heading)
                    wrapper.append(image)
                    wrapper.append(paragraph)
                    wrapper.append(buttonWrapper)
                    wrapper.style.marginRight = '20px'
                    existing!.append(wrapper)
                    wrapper!.onclick = () => {
                        /*console.log(res.title)*/
                    }
                })
            })
    }, [])
    return (
        <div>
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
            <Alert variant="secondary">
                <Alert.Heading>
                    <h2>
                        <b>Welcome to Kula Learn</b>
                    </h2>
                </Alert.Heading>
            </Alert>
            <div className="page-home shadow p-3 mb-5 bg-body rounded">
                <CardGroup>
                    <Card>
                        <Card.Img
                            className="img-decoration rounded mx-auto d-block"
                            variant="top"
                            src="https://i.ibb.co/ZBYYGj0/course.png"
                        />
                        <Card.Body>
                            <Card.Title className="align-center">Browse</Card.Title>
                            <Card.Text className="align-center">
                                <p>We offer beginner and more advanced courses.</p>
                                {user == null ? (
                                    <></>
                                ) : (
                                    <>
                                        {user.role == 'instructor' ? (
                                            <>
                                                <button
                                                    className="btn btn-primary wide wider"
                                                    onClick={() => navigate('/courses/create')}
                                                >
                                                    Create New Course
                                                </button>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
                <div className=" left">
                    <p>
                        <div
                            id="cards-li"
                            className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3"
                        ></div>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Courses
