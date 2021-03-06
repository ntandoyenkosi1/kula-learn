import { useEffect, useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Navigation from '../layout/Navigation'
import { callApi, getCookie } from '../helpers'
const EditModule = () => {
    const { id } = useParams()
    const [moduleData, setModuleData] = useState()
    const [modalShow, setModalShow] = useState(false)
    const handleSave = async () => {
        const t = (document.getElementById('module-title') as HTMLInputElement).value
        const d = (document.getElementById('video-short') as HTMLInputElement).value
        const i = (document.getElementById('video-link') as HTMLInputElement).value
        const raw = JSON.stringify({
            id: id,
            title: t,
            shortDescription: d,
            image: i,
        })
        await callApi('api/course/', 'PUT', true, raw)
        setModalShow(false)
    }
    useEffect(() => {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify({
            id: `${id}`,
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        void fetch('https://kula-learn-server.herokuapp.com/api/course/', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const myHeaders = new Headers()
                myHeaders.append('x-auth-token', getCookie('token'))
                myHeaders.append('Content-Type', 'application/json')

                const raw = JSON.stringify({
                    id: result[0].collectionID,
                })

                const requestOptions: RequestInit = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow',
                }

                void fetch('https://kula-learn-server.herokuapp.com/modules/', requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        result.forEach((res: any) => {
                            const blank = document.getElementById('edit-blank')
                            const wrapper = document.createElement('div')
                            const heading = document.createElement('h4')
                            const short = document.createElement('p')
                            const editBtn = document.createElement('button')
                            const deleteBtn = document.createElement('button')
                            short.innerText = res.shortDescription
                            heading.innerText = res.title
                            editBtn.innerText = 'Edit'
                            deleteBtn.innerText = 'Delete'
                            editBtn.className = 'btn'
                            deleteBtn.className = 'btn btn-danger'
                            editBtn.onclick = () => {
                                setModuleData(res)
                                setModalShow(true)
                            }
                            deleteBtn.onclick = () => {
                                const myHeaders = new Headers()
                                myHeaders.append('Content-Type', 'application/json')

                                const raw = JSON.stringify({
                                    id: res.ID,
                                })

                                const requestOptions: RequestInit = {
                                    method: 'DELETE',
                                    headers: myHeaders,
                                    body: raw,
                                    redirect: 'follow',
                                }

                                void fetch(
                                    'https://kula-learn-server.herokuapp.com/api/module',
                                    requestOptions
                                ).then((response) => response.text())
                            }
                            wrapper.className = 'shadow p-3 mb-5 bg-body rounded'
                            wrapper.append(heading)
                            wrapper.append(short)
                            wrapper.append(editBtn)
                            wrapper.append(deleteBtn)
                            blank!.append(wrapper)
                        })
                    })
            })
    }, [])
    function Module(props: any) {
        return (
            <div>
                <Alert className="custom-alert">
                    <Alert.Heading>
                        <h1>
                            <b>Edit module</b>
                        </h1>
                    </Alert.Heading>
                </Alert>
                <div className="mb-3">
                    <label className="form-label">Edit course title.</label>
                    <input
                        id="module-title"
                        className="form-control"
                        type="text"
                        onChange={() => {
                            /** */
                        }}
                        value={props.data.title}
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
                        maxLength={500}
                        id="video-short"
                        onChange={() => {
                            /** */
                        }}
                        value={props.data.shortDescription}
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
                        onChange={() => {
                            /** */
                        }}
                        value={props.data.longDescription}
                        maxLength={2000}
                        id="video-long"
                    ></textarea>
                    <label>
                        Long Description{' '}
                        <span style={{ color: 'red' }}>(max: 2000 characters)</span>
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Enter a video link here.</label>
                    <input
                        id="video-link"
                        className="form-control"
                        type="text"
                        onChange={() => {
                            /** */
                        }}
                        value={props.data.video}
                    />
                </div>
                <button className="btn" onClick={handleSave}>
                    Save changes
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
                    <Module data={props.module} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
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
            <ModuleModal module={moduleData} show={modalShow} onHide={() => setModalShow(false)} />
            <div className="container">
                <div id="edit-blank" className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3"></div>
            </div>
        </>
    )
}
export default EditModule
