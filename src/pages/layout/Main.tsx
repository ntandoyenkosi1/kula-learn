//import React from "react";
//import SideBar from "./SideBar";
//import { CourseType } from "../pages/types";
import Navigation from './Navigation'
const Main = (props: any) => {
    function w3_open() {
        document.getElementById('mySidebar')!.style.display = 'block'
    }
    if (props.origin === 'Course') {
        return (
            <div>
                <div className="w3-main" style={{ marginLeft: '200px' }}>
                    <div className="w3-teal">
                        <button
                            className="w3-button w3-teal w3-xlarge w3-hide-large"
                            onClick={w3_open}
                        >
                            &#9776;
                        </button>
                        <div className="w3-container">
                            <Navigation />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="w3-main">
                    <div className="w3-teal">
                        <button
                            className="w3-button w3-teal w3-xlarge w3-hide-large"
                            onClick={w3_open}
                        >
                            &#9776;
                        </button>
                        <div className="w3-container">
                            <Navigation />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Main
