//import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Alert, Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import Footer from '../layout/Footer'
import Main from '../layout/Main'
import Courses from './Courses'
//import Loading from '../auth/Loading'
interface Courses {
    collectionID: string
    title: string
    description: string
    image: string
    iat: number
}
function generateUUID() {
    // Public Domain/MIT
    let d = new Date().getTime() //Timestamp
    let d2 =
        (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 //random number between 0 and 16
        if (d > 0) {
            //Use timestamp until depleted
            r = (d + r) % 16 | 0
            d = Math.floor(d / 16)
        } else {
            //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0
            d2 = Math.floor(d2 / 16)
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
}
const Create = () => {
    const [modalShow, setModalShow] = useState(false)
    const [courseToggled, setCourseToggled] = useState(false)
    const [moduleToggled, setModuleToggled] = useState(false)
    const [course, setCourse] = useState<Courses>()
    const moduleList: any = []
    const handleAddCourse = async () => {
        const t = (document.getElementById('course-title') as HTMLInputElement).value
        const d = (document.getElementById('course-description') as HTMLInputElement).value
        const i = (document.getElementById('course-link') as HTMLInputElement).value
        const iat = Math.round(new Date().getTime() / 1000)
        if (t == '' || d == '' || i == '') {
            return
        }
        const collection = generateUUID()
        setCourse({ collectionID: collection, title: t, description: d, image: i, iat: iat })
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify({
            collectionID: collection,
            title: t,
            description: d,
            image: i,
            iat: iat,
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }
        await fetch('https://kula-learn-server.herokuapp.com/course/', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setCourse(result)
            })
        setCourseToggled(true)
    }
    const handleAddModule = async () => {
        const short = (document.getElementById('video-short') as HTMLInputElement).value
        const long = (document.getElementById('video-long') as HTMLInputElement).value
        const link = (document.getElementById('video-link') as HTMLInputElement).value
        const moduleTitle = (document.getElementById('module-title') as HTMLInputElement).value
        if (short == '' || long == '' || link == '' || moduleTitle == '') {
            return
        }
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify({
            collectionID: course?.collectionID,
            language: 'en',
            title: moduleTitle,
            shortDescription: short,
            longDescription: long,
            video: link,
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }
        await fetch('https://kula-learn-server.herokuapp.com/module/', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                moduleList?.push(result)
                moduleList.forEach((res: any) => {
                    const existing = document.getElementById('modules-added')
                    const wrapper = document.createElement('div')
                    const heading = document.createElement('h3')
                    const paragraph = document.createElement('p')
                    wrapper.className = 'shadow p-3 bg-body rounded'
                    heading.innerText = res.title
                    paragraph.innerText = res.shortDescription
                    wrapper.append(heading)
                    wrapper.append(paragraph)
                    existing!.append(wrapper)
                })
            })
        setModalShow(false)
        setModuleToggled(true)
    }
    function Module() {
        return (
            <div>
                <Alert variant="secondary">
                    <Alert.Heading>
                        <h1>
                            <b>Add a new module</b>
                        </h1>
                    </Alert.Heading>
                </Alert>
                <h4>Module Title</h4>
                <div className="mb-3">
                    <label className="form-label">Enter a course title.</label>
                    <input
                        id="module-title"
                        className="form-control"
                        type="text"
                        placeholder="Module title"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Language. (default: English)</label>
                    <input id="language" className="form-control" type="text" value="en" readOnly />
                </div>
                <h2>Short Description</h2>
                <p>Use this area to give a short description of the new module. </p>
                <div className="form-floating textarea mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Enter description"
                        maxLength={500}
                        id="video-short"
                    ></textarea>
                    <label>
                        Short description{' '}
                        <span style={{ color: 'red' }}>(max: 500 characters)</span>
                    </label>
                </div>
                <h4>Long description</h4>
                <p>
                    Use this area to give a long description of the new module. Take note that HTML
                    format is supported.
                </p>
                <div className="form-floating textarea mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Enter description"
                        maxLength={2000}
                        id="video-long"
                    ></textarea>
                    <label>
                        Long Description{' '}
                        <span style={{ color: 'red' }}>(max: 2000 characters)</span>
                    </label>
                </div>
                <h4>Video Explainer</h4>
                <div className="mb-3">
                    <label className="form-label">Enter a brief video explanation here.</label>
                    <input
                        id="video-description"
                        className="form-control"
                        type="text"
                        placeholder="Text explainer of the video in this module"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Enter a video link here.</label>
                    <input
                        id="video-link"
                        className="form-control"
                        type="text"
                        placeholder="Video link to an explainer of this module"
                    />
                </div>
                <button className="btn btn-success" onClick={handleAddModule}>
                    Add module
                </button>
            </div>
        )
    }
    function ModuleModal(props: any) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Add a new Module</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Module />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <div>
            <Main origin="Home" />
            <Alert variant="secondary">
                <Alert.Heading>
                    <h1>
                        <b>Add a new course</b>
                    </h1>
                </Alert.Heading>
            </Alert>
            <div className="page-course shadow p-3 mb-5 bg-body rounded">
                {courseToggled ? (
                    <>
                        <h3>In progress</h3>
                        <h6>Course Title: {course?.title}</h6>
                        <h6>Course Description: {course?.description}</h6>
                        <img
                            className="rounded mx-auto d-block"
                            src={course?.image}
                            width={100}
                            height={100}
                        />
                        <hr />
                    </>
                ) : (
                    <>
                        <h3>Course Information</h3>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                id="course-title"
                                required
                                maxLength={50}
                                className="form-control"
                                placeholder="Enter course title"
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                id="course-description"
                                required
                                maxLength={200}
                                className="form-control"
                                placeholder="Enter short description"
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                id="course-link"
                                maxLength={50}
                                required
                                className="form-control"
                                placeholder="Enter a thumbnail link here for the course"
                            />
                        </div>
                        <p>
                            <button className="btn btn-success wide" onClick={handleAddCourse}>
                                Save
                            </button>
                        </p>
                    </>
                )}
                {courseToggled ? (
                    <>
                        <h2>Add a module</h2>
                        <hr />
                        <button
                            className="btn btn-success center"
                            onClick={() => setModalShow(true)}
                        >
                            Click here to add a new module
                        </button>
                        <hr />
                    </>
                ) : (
                    <div></div>
                )}
                {courseToggled ? (
                    <>
                        <ModuleModal show={modalShow} onHide={() => setModalShow(false)} />
                    </>
                ) : (
                    <div></div>
                )}
                {moduleToggled ? (
                    <>
                        <h4>Added modules</h4>
                    </>
                ) : (
                    <></>
                )}
                {/* <div id="modules-added"></div> */}
                <div className="container container-center">
                    <div
                        id="modules-added"
                        className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3"
                    ></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Create
