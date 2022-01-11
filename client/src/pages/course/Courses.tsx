//import { withAuthenticationRequired } from '@auth0/auth0-react'
//import Loading from '../auth/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { Alert, Card, CardGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loading from '../auth/Loading'
import Footer from '../layout/Footer'
import Navigation from '../layout/Navigation'
const Courses = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow',
        }
        void fetch('http://localhost:4000/courses/', requestOptions)
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

                        void fetch('http://localhost:4000/courses/', requestOptions).then(
                            (response) => response.json()
                        )
                        // .then((result) => {
                        //     console.log(result)
                        // })
                        // .catch((error) => console.log('error', error))
                    }
                    del.innerText = 'Delete'
                    del.className = 'btn btn-primary'
                    buttonWrapper.append(preview)
                    buttonWrapper.append(enrol)
                    buttonWrapper.append(del)
                    buttonWrapper.append(edit)
                    wrapper.append(heading)
                    wrapper.append(image)
                    wrapper.append(paragraph)
                    wrapper.append(buttonWrapper)
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
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
            <div className="container">
                <div id="cards-li" className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3"></div>
            </div>
            <Footer />
        </div>
    )
}
export default withAuthenticationRequired(Courses, {
    onRedirecting: () => <Loading />,
  });
