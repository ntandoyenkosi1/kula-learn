//import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { Accordion } from "react-bootstrap"
//import icon from "./assets/falling-star.png"
import video from "./assets/Media1.mp4"
import explain from "./assets/presentation.png"
import Footer from "./layout/Footer"
import Navigation from "./layout/Navigation"
import type ModuleData from "./types"

const Module=(props:any)=>{
    const placeHolder:ModuleData=props.data[0]
    const [data, setData]=useState<ModuleData>(placeHolder)
    //const { user, isAuthenticated } = useAuth0();
    //const [links, setLinks]=useState([])
    //const svg1=<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-wifi-1" viewBox="0 0 16 16"><path d="M11.046 10.454c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.611-.091l.015-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.708-.707z"/></svg>
    const tab = document.createElement("table")
    tab.className="nav nav-pills flex-column mb-auto"
    props.data.forEach((l:ModuleData)=>{
        const tr = tab.insertRow(-1)
        const tabCell = tr.insertCell(-1)
        tabCell.onclick = () => {
            setData(l)
        }
        tabCell.className = 'nav-link link-dark sidebar-btn'//'button text-center fs-5 w3-large custom-btn'
        tabCell.innerHTML = l.title
        tabCell.style.justifyContent = 'center'
        tabCell.style.alignItems = 'center'
        tabCell.style.alignSelf = 'center'
    })
    useEffect(()=>{
        const divContainer = document.getElementById("sidebar");
        divContainer!.innerHTML = "";
        divContainer!.appendChild(tab);
    },[tab])
    return (
        <div>
            <div
                className="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left"
                style={{ width: '200px' }}
                id="mySidebar"
            >
                <img
                    src="https://i.ibb.co/1GgrKCJ/goat.png"
                    alt="logo"
                    className="rounded mx-auto d-block"
                    style={{ width: '90px', height: '90px' }}
                />
                <button
                    className="w3-bar-item w3-button w3-large w3-hide-large"
                    onClick={() => (document.getElementById('mySidebar')!.style.display = 'none')}
                >
                    Close &times;
                </button>
                <div className="nav nav-pills flex-column mb-auto" style={{ justifyContent: 'center', alignItems: 'center' }} id="sidebar"></div>
            </div>
            <div className="w3-main" style={{ marginLeft: '210px' }}>
                <div className="w3-teal">
                    <button
                        className="w3-button w3-teal w3-xlarge w3-hide-large"
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
                                    <div style={{ textAlign: 'justify' }} className="col justify">
                                        {data?.shortDescription}
                                    </div>
                                    <div className="col">
                                        <img
                                            alt=""
                                            className="rounded mx-auto d-block im"
                                            src={explain}
                                            style={{ maxWidth: '200px', maxHeight: '200px' }}
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
                            <div></div>
                            <video
                                src={video}
                                style={{ width: '99%' }}
                                autoPlay={false}
                                controls={true}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" style={{ width: '99%' }}>
                        <Accordion.Header>
                            <h2>Summary</h2>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div style={{ textAlign: 'justify' }}>{data?.longDescription}</div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Footer />
            </div>
        </div>
    )
}
export default Module;