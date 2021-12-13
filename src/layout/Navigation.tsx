import { Navbar, Container } from "react-bootstrap";
const Navigation=()=>{
    const isAuthenticated=false
    if(isAuthenticated){
        return <div>
            {/**
             * Return NavBar with user info here. Without login and register. Include progress.
             */}
        </div>
    }
    else{
        return <div>
        <Navbar>
            {/* <Container> */}
                <Navbar.Brand><h1 style={{color:"white"}}>Kula Learn</h1></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                <a href="#home" className="button text-center fs-5 w3-large" style={{color:"white"}}>Login</a>
                </Navbar.Text>
                <Navbar.Text>
                &nbsp; &nbsp;
                </Navbar.Text>
                <Navbar.Text>
                    <a href="#home" className="button text-center fs-5 w3-large" style={{color:"white"}}>Register</a>
                </Navbar.Text>
                </Navbar.Collapse>
            {/* </Container> */}
            </Navbar>
    </div>
    }
    
}
export default Navigation;