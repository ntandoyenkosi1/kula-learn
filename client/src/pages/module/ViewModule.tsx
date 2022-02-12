//import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
//import icon from "./assets/falling-star.png"
//import video from '../assets/Media1.mp4'
//import explain from '../assets/presentation.png'
import Loading from '../auth/Loading'
import Footer from '../layout/Footer'
import Navigation from '../layout/Navigation'
import type { ModuleType } from '../types'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
const ModuleView = (props: any) => {
    const placeHolder: ModuleType = props.data[0]
    const [data, setData] = useState<ModuleType>(placeHolder)
    const [toggled, setToggled] = useState(false)
    const [ytID, setYtID] = useState('')
    const tab = document.createElement('table')
    tab.className = 'nav nav-pills flex-column mb-auto'
    props.data.forEach((l: ModuleType) => {
        const tr = tab.insertRow(-1)
        const tabCell = tr.insertCell(-1)
        tabCell.onclick = () => {
            setToggled(true)
            setData(l)
            if(l.video){
                if (l.video.includes('https://www.youtube.com/watch?v=')) {
                    const id = l.video.replace('https://www.youtube.com/watch?v=', '').toString()
                    const and = id.indexOf('&')
                    const ids = id.slice(0, and).toString()
                    setYtID(ids)
                } else if (l.video.includes('https://www.youtube.com/embed/')) {
                    setYtID(l.video)
                }
            }
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
                        <h1>{data?.title}</h1>
                        <div style={{ textAlign: 'justify' }} className="col justify">
                            {data?.shortDescription}
                        </div>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {data?.longDescription}
                        </ReactMarkdown>
                        {data?.video ? (
                            <>
                                <h3>[Video Title]</h3>
                                <div style={{ textAlign: 'center' }}>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${ytID}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
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
export default ModuleView
