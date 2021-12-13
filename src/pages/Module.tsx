import video from "../assets/Media1.mp4"
import explain from "../images/presentation.png"
import { Accordion } from "react-bootstrap"
const Module=(props:any)=>{
    return <div className="w3-main" style={{marginLeft:"210px"}}>
        <Accordion defaultActiveKey="0">
            <h1 style={{width:"99%"}} className="alert alert-primary">{props.data.title}</h1>
            <Accordion.Item eventKey="0" style={{width:"99%"}}>
            <Accordion.Header><h2>Description</h2></Accordion.Header>
            <Accordion.Body>
                <div className="container">
                    <div className="row">
                        <div style={{textAlign:"justify"}} className="col justify">{props.data.shortDescription}</div>
                        <div className="col"><img alt="" className="rounded mx-auto d-block im" src={explain} style={{maxWidth:"200px", maxHeight:"200px"}}/></div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" style={{width:"99%"}}>
            <Accordion.Header><h2>Video</h2></Accordion.Header>
            <Accordion.Body>
                <video src={video} style={{width:"99%"}} autoPlay={false} controls={true}/>
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" style={{width:"99%"}}>
                    <Accordion.Header><h2>Summary</h2></Accordion.Header>
                    <Accordion.Body>
                <div style={{textAlign:"justify"}}>{props.data.longDescription}</div>
            </Accordion.Body>
            </Accordion.Item>
        
        
        </Accordion>
    </div>
}
export default Module;