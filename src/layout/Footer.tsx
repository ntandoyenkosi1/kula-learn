import { Link } from "react-router-dom";
import "../App.css";
const Footer=()=>{
    return <div>
        <div>
        &nbsp; &nbsp;
            <span className="footer1"><Link className="footer1" to="/">Home</Link></span>
            &nbsp;
            <span  className="footer1"><Link className="footer1" to="/register">Register</Link></span>
            &nbsp;
            <span className="footer1"><Link className="footer1" to="/about">About</Link></span>
            &nbsp;
            <span className="footer1"><Link className="footer1" to="/github">Github</Link></span>
            &nbsp;
            <span className="footer1"><Link className="footer1" to="/courses">Courses</Link></span>
            &nbsp;
            <span className="footer1"><Link className="footer1" to="/profile">Profile</Link></span>
        </div>
    </div>
}
export default Footer;