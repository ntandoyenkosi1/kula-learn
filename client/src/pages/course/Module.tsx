//import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from 'react'
import { Accordion, Alert } from 'react-bootstrap'
//import icon from "./assets/falling-star.png"
import explain from '../assets/presentation.png'
import Loading from '../auth/Loading'
import Footer from '../layout/Footer'
import Navigation from '../layout/Navigation'
import type { ModuleType } from '../types'

const Module = (props: any) => {
    const placeHolder: ModuleType = props.data[0]
    const [data, setData] = useState<ModuleType>(placeHolder)
    const [toggled, setToggled] = useState(false)
    const tab = document.createElement('table')
    tab.className = 'nav nav-pills flex-column mb-auto'
    props.data.forEach((l: ModuleType) => {
        const tr = tab.insertRow(-1)
        const tabCell = tr.insertCell(-1)
        tabCell.onclick = () => {
            setToggled(true)
            setData(l)
        }
        tabCell.className = 'nav-link link-dark sidebar-btn alert'
        tabCell.innerHTML = l.title
        tabCell.style.justifyContent = 'center'
        tabCell.style.alignItems = 'center'
        tabCell.style.alignSelf = 'center'
    })
    useEffect(() => {
        const divContainer = document.getElementById('sidebar')
        divContainer!.innerHTML = ''
        divContainer!.appendChild(tab)
    }, [tab])
    return (
        <div>
            <div
                className="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left"
                style={{ width: '200px' }}
                id="mySidebar"
            >
                 <Alert className='custom-alert' variant="success">
                    <h2>
                        <b>Chapters</b>
                    </h2>
                </Alert>
                <button
                    className="w3-bar-item w3-button w3-large w3-hide-large"
                    onClick={() => (document.getElementById('mySidebar')!.style.display = 'none')}
                >
                    Close &times;
                </button>
                <div
                    className="nav nav-pills flex-column mb-auto"
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    id="sidebar"
                ></div>
            </div>
            <div className="w3-main" style={{ marginLeft: '210px' }}>
                <div className="bg-new">
                    <button
                        className="w3-button bg-new w3-xlarge w3-hide-large"
                        onClick={() =>
                            (document.getElementById('mySidebar')!.style.display = 'block')
                        }
                    >
                        &#9776;
                    </button>
                    <div className="w3-container">
                        <Navigation />
                    </div>
                </div>
                {toggled ? (
                    <>
                        <div className="page-course shadow p-3 mb-5 bg-body rounded">
                            <Accordion defaultActiveKey="0">
                                <h1 style={{ width: '99%' }} className="alert alert-primary">
                                    {data?.title}
                                </h1>
                                <Accordion.Item eventKey="0" style={{ width: '99%' }}>
                                    <Accordion.Header>
                                        <h2>Description</h2>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="container">
                                            <div className="row">
                                                <div
                                                    style={{ textAlign: 'justify' }}
                                                    className="col justify"
                                                >
                                                    {data?.shortDescription}
                                                </div>
                                                <div className="col">
                                                    <img
                                                        alt=""
                                                        className="rounded mx-auto d-block im"
                                                        src={explain}
                                                        style={{
                                                            maxWidth: '200px',
                                                            maxHeight: '200px',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1" style={{ width: '99%' }}>
                                    <Accordion.Header>
                                        <h2>Video</h2>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div style={{ textAlign: 'center' }}>
                                            <video
                                                autoPlay={false}
                                                controls={true}
                                                style={{ width: '99%' }}
                                            />
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2" style={{ width: '99%' }}>
                                    <Accordion.Header>
                                        <h2>Summary</h2>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div style={{ textAlign: 'justify' }}>
                                            {data?.longDescription}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="page-course shadow p-3 mb-5 bg-body rounded">
                            <h1>A selected chapter will appear below</h1>
                            <Loading />
                        </div>
                    </>
                )}
                <Footer />
            </div>
        </div>
    )
}
export default Module
