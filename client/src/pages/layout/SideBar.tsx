import { useEffect} from "react";
//import "../../App.css"
import icon from "../assets/falling-star.png"
import {ModuleType} from "../types"
const SideBar=(props:any)=>{
    function w3_close() {
        document.getElementById("mySidebar")!.style.display = "none";
    }
    const tab = document.createElement("table")
    props.data.forEach((l:ModuleType)=>{
        const tr = tab.insertRow(-1);
        const tabCell = tr.insertCell(-1);
        tabCell.className="button text-center fs-5 w3-large sidebar-btn"
        tabCell.innerHTML = l.title;
        tabCell.style.justifyContent="center";
        tabCell.style.alignItems="center"
        tabCell.style.alignSelf="center"
    })
    useEffect(()=>{
        const divContainer = document.getElementById("sidebar");
        divContainer!.innerHTML = "";
        divContainer!.appendChild(tab);
    },[tab])
    return <div>
        <div className="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left" style={{width:"200px"}} id="mySidebar">
			<img src={icon} alt="logo" className="rounded mx-auto d-block" style={{width:"90px", height:"90px"}}/>
			<button className="w3-bar-item w3-button w3-large w3-hide-large" onClick={w3_close}>Close &times;</button>
            <div style={{justifyContent:"center", alignItems:"center"}} id="sidebar"></div>
		</div>
    </div>
}
export default SideBar;