import Navigation from './Navigation'
const Main = (props: any) => {
    function w3_open() {
        document.getElementById('mySidebar')!.style.display = 'block'
    }
    if (props.origin === 'Course') {
        return (
            <div>
                <div className="w3-main" style={{ marginLeft: '200px' }}>
                    <div className="bg-new">
                        <button
                            className="bg-new w3-xlarge"
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
                <div className="">
                    <div className="bg-new">
                        {/* <button
                            className=" bg-new"
                            onClick={w3_open}
                        >
                            &#9776;
                        </button> */}
                        <div className="">
                            <Navigation />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Main
