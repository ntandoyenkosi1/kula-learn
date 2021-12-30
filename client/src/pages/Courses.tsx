import { useEffect } from 'react'
import { Alert, Card, CardGroup } from 'react-bootstrap'
import Footer from './layout/Footer'
import Navigation from './layout/Navigation'
const response = [
    {
        ID: '1',
        collectionID: '1',
        title: 'A',
        shortDescription: 'B',
        imageUrl: 'https://i.ibb.co/1GgrKCJ/goat.png',
        createdAt: '',
    },
    {
        ID: '2',
        collectionID: '2',
        title: 'B',
        shortDescription: 'B',
        imageUrl: 'https://i.ibb.co/1GgrKCJ/goat.png',
        createdAt: '',
    },
    {
        ID: '3',
        collectionID: '3',
        title: 'C',
        shortDescription: 'C',
        imageUrl: 'https://i.ibb.co/1GgrKCJ/goat.png',
        createdAt: '',
    },
    {
        ID: '2',
        collectionID: '2',
        title: 'B',
        shortDescription: 'B',
        imageUrl: 'https://i.ibb.co/1GgrKCJ/goat.png',
        createdAt: '',
    },
    {
        ID: '3',
        collectionID: '3',
        title: 'C',
        shortDescription: 'C',
        imageUrl: 'https://i.ibb.co/1GgrKCJ/goat.png',
        createdAt: '',
    },
    {
        ID: '2',
        collectionID: '2',
        title: 'B',
        shortDescription: 'B',
        imageUrl: 'https://i.ibb.co/1GgrKCJ/goat.png',
        createdAt: '',
    },
    {
        ID: '3',
        collectionID: '3',
        title: 'C',
        shortDescription: 'C',
        imageUrl: 'https://i.ibb.co/1GgrKCJ/goat.png',
        createdAt: '',
    },
    {
        ID: '2',
        collectionID: '2',
        title: 'B',
        shortDescription: 'B',
        imageUrl: 'https://i.ibb.co/1GgrKCJ/goat.png',
        createdAt: '',
    },
    {
        ID: '3',
        collectionID: '3',
        title: 'C',
        shortDescription: 'C',
        imageUrl: 'https://i.ibb.co/1GgrKCJ/goat.png',
        createdAt: '',
    },
]
const Courses = () => {
    useEffect(() => {
        //
        response.forEach((res) => {
            //
            const existing = document.getElementById('cards-li')
            const wrapper = document.createElement('div')
            const heading = document.createElement('h3')
            const paragraph = document.createElement('p')
            const image = document.createElement('img')
            const preview = document.createElement('button')
            const enrol = document.createElement('button')
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
            buttonWrapper.append(preview)
            buttonWrapper.append(enrol)
            wrapper.append(heading)
            wrapper.append(image)
            wrapper.append(paragraph)
            wrapper.append(buttonWrapper)
            existing!.append(wrapper)
            wrapper!.onclick = () => {
                /*console.log(res.title)*/
            }
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
            {/* <h2>
                <b>Explore our courses below</b>
            </h2> */}
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
export default Courses
