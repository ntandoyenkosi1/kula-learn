import {  useState } from 'react'
import {  Col, Row, Toast } from 'react-bootstrap'
function Toaster(props:any) {
    const [show, setShow] = useState(false)
    return (
        <Row>
            <Col><div>
                <Toast style={{position:"absolute", zIndex:9, bottom:"0%", right:"0%"}} bg="dark" onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header>
                        {/* <img className="rounded me-2" alt="" /> */}
                        <strong className="me-auto">Notification</strong>
                        <small>Just Now</small>
                    </Toast.Header>
                    <Toast.Body><p style={{color:"white"}}>{props.message}</p></Toast.Body>
                </Toast></div>
            </Col>
        </Row>
    )
}
export default Toaster