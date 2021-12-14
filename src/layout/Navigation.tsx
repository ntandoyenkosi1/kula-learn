import { Navbar} from "react-bootstrap";
import LogoutButton from "../pages/auth/LogoutButton";
import LoginButton from "../pages/auth/LoginButton";
const Navigation=()=>{
    const isAuthenticated=false
    if(isAuthenticated){
        return <div>
            {/**
             * Return NavBar with user info here. Without login and register. Include progress.
             */}
             <Navbar>
                <Navbar.Brand><h1 style={{color:"white"}}>Kula Learn</h1></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                <a href="#home" className="button text-center fs-5 w3-large" style={{color:"white"}}><LogoutButton/></a>
                </Navbar.Text>
                </Navbar.Collapse>
                
            </Navbar>
        </div>
    }
    else{
        return <div>
        <Navbar>
                <Navbar.Brand><h1 style={{color:"white"}}>Kula Learn</h1></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                <a href="#home" className="button text-center fs-5 w3-large" style={{color:"white"}}><LoginButton/></a>
                </Navbar.Text>
                </Navbar.Collapse>
                
            </Navbar>
    </div>
    }
    
}
export default Navigation;