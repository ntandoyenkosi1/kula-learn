import { useEffect} from "react";
import "../../App.css"
import icon from "../assets/falling-star.png"
import type ModuleData from "../types"
const SideBar=(props:any)=>{
    function w3_close() {
        document.getElementById("mySidebar")!.style.display = "none";
    }
    //const [links, setLinks]=useState([])
    //const svg1=<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-wifi-1" viewBox="0 0 16 16"><path d="M11.046 10.454c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.611-.091l.015-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.708-.707z"/></svg>
    const tab = document.createElement("table")
    props.data.forEach((l:ModuleData)=>{
        const tr = tab.insertRow(-1);
        const tabCell = tr.insertCell(-1);
        //tabCell.onclick=()=>console.log(l.title)
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