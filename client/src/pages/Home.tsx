import { Alert, Card, CardGroup } from 'react-bootstrap'
import Footer from './layout/Footer'
import Main from './layout/Main'
import { useNavigate } from 'react-router-dom'
//import Example from "./example.mdx"
// import remarkGfm from 'remark-gfm'
// import ReactMarkdown from 'react-markdown'
const Home = () => {
//     const markdown = `A paragraph with *emphasis* and **strong importance**.

// > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

// * Lists
// * [ ] todo
// * [x] done

// A table:

// | a | b |
// | - | - |
// \`\`\`
//     python -m Http.server
//     node server.js
//     node server.js
// \`\`\`
// `
    const navigate = useNavigate()
    return (
        <div>
            <Main origin="Home" />
            <Alert variant="secondary">
                <Alert.Heading>
                    <h2>
                        <b>Welcome to Kula Learn</b>
                    </h2>
                </Alert.Heading>
            </Alert>
            {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
            </ReactMarkdown> */}
            <div className="page-home shadow p-3 mb-5 bg-body rounded">
                <p>
                    Use this platform to learn a new skill. Register a new account or login to gain
                    access to our range of online courses we offer here at Kula.
                </p>
                <h2>
                    <b>Why choose Kula?</b>
                </h2>
                <CardGroup>
                    <Card>
                        <Card.Img
                            className="img-decoration rounded mx-auto d-block"
                            variant="top"
                            src="https://i.ibb.co/SQzHc5W/promotion.png"
                        />
                        <Card.Body>
                            <Card.Title className="align-center">Beginner and advanced</Card.Title>
                            <Card.Text className="align-center">
                                <p>We offer beginner and more advanced courses.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img
                            className="img-decoration rounded mx-auto d-block"
                            variant="top"
                            src="https://i.ibb.co/kgKbcw1/blockchain.png"
                        />
                        <Card.Body>
                            <Card.Title className="align-center">Blockchain courses</Card.Title>
                            <Card.Text className="align-center">
                                <p>
                                    We offer Blockchain courses and this site has web3 enabled by
                                    default.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img
                            className="img-decoration rounded mx-auto d-block"
                            variant="top"
                            src="https://i.ibb.co/9stx1C6/goal.png"
                        />
                        <Card.Body>
                            <Card.Title className="align-center">Track progress</Card.Title>
                            <Card.Text className="align-center">
                                <p>We also keep track of your progress.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img
                            className="img-decoration rounded mx-auto d-block"
                            variant="top"
                            src="https://i.ibb.co/0YZpW7C/offline.png"
                        />
                        <Card.Body>
                            <Card.Title className="align-center">Offline support</Card.Title>
                            <Card.Text className="align-center">
                                <p>
                                    We also offer offline support and the courses are offered in
                                    different languages.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
                <hr />
                <Alert variant="secondary">
                    <Alert.Heading>
                        <h2 className="mb-0 align-center">
                            <b>Explore one of our courses below.</b>
                        </h2>
                    </Alert.Heading>
                </Alert>
                <Card className="text-center" style={{ color: '#0f5132' }}>
                    <Card.Header>
                        {' '}
                        <h4>
                            <b>Featured Course</b>
                        </h4>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <h5>
                                <b>Introduction to Blockchain</b>
                            </h5>
                        </Card.Title>
                        <Card.Text>
                            <p style={{ textAlign: 'center' }}>
                                This course explores the fundamentals of Blockchain. Enroll in this
                                course to gain more information about Blockchain.
                                <br />
                                In this course you will learn what is Blockchain? What are its
                                benefits, advantages, disadvantages and practical use cases.
                            </p>
                        </Card.Text>
                        <button
                            className="btn btn-primary wide"
                            onClick={() => navigate('/course/c9baa837-b503-4a08-804b-b318ad7ee7d7')}
                        >
                            Go to course
                        </button>
                    </Card.Body>
                </Card>
            </div>
            <Footer />
        </div>
    )
}
export default Home
