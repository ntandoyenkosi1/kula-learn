import icon from "../images/falling-star.png"
const HomeSideBar=()=>{
    function w3_close() {
        document.getElementById("mySidebar")!.style.display = "none";
    }
    return <div className="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left" style={{width:"200px"}} id="mySidebar">
            <img src={icon} alt="logo" className="rounded mx-auto d-block" style={{width:"90px", height:"90px"}}/>
            <button className="w3-bar-item w3-button w3-large w3-hide-large" onClick={w3_close}>Close &times;</button>
            <div style={{justifyContent:"center", alignItems:"center"}} id="sidebar"></div>
            </div>
}
export default HomeSideBar;