import { Alert, Card, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Footer from "./layout/Footer";
import Main from "./layout/Main";
const Create=()=>{
    const [modalShow, setModalShow] = useState(false);
    const ModuleModal=(props:any)=> {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add a new Module
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Module/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    return <div>
        <Main origin="Home" />
        <Alert variant="secondary">
                <Alert.Heading>
                    <h1><b>Add a new course</b></h1>
                </Alert.Heading>
            </Alert>
            <p>A course can have multiple modules.</p>
            <h2>Add a module</h2>
            <button className="btn btn-success center" onClick={() => setModalShow(true)}>
                Click here to add a new module
            </button>

            <ModuleModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <hr/>
            <h3>Added modules will appear below.</h3>
            <Card>
                    <Card.Img
                        className="img-decoration rounded mx-auto d-block"
                        variant="top"
                        src="https://i.ibb.co/9stx1C6/goal.png"
                    />
                    <Card.Body>
                        <Card.Title className="align-center">Title</Card.Title>
                        <Card.Text className="align-center">
                            <p>Short module description.</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            <button className="btn btn-success">Add course</button>
        <Footer/>
    </div>

}
const Module=()=>{
    return <div>
        <Alert variant="secondary">
                <Alert.Heading>
                    <h1><b>Add a new module</b></h1>
                </Alert.Heading>
            </Alert>
        <h2>Short Description</h2>
        <p>Use this area to give a short description of the new module. </p>
        <div className="form-floating textarea mb-3">
            <textarea className="form-control" placeholder="Enter description" maxLength={500}></textarea>
            <label>Short description <span style={{color:"red"}}>(max: 500 characters)</span></label>
        </div>
        <h2>Long description</h2>
        <p>Use this area to give a long description of the new module. Take note that HTML format is supported.</p>
        <div className="form-floating textarea mb-3">
            <textarea className="form-control" placeholder="Enter description" maxLength={2000}></textarea>
            <label>Long Description  <span style={{color:"red"}}>(max: 2000 characters)</span></label>
        </div>
        <h2>Video Description</h2>
        <div className="mb-3">
        <label className="form-label">Upload a video file here.</label>
        <input accept=".mp4" className="form-control" type="file"/>
        </div>
        <button className="btn btn-success">Add module</button>
    </div>
}

export default Create;