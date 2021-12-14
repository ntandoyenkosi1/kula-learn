import './App.css';
//import HomeSideBar from './layout/HomeSideBar';
import Main from './layout/Main';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
//import BgImg from "./images/book.png";
import Profile from './pages/auth/Profile';
import Footer from './layout/Footer';
import Course from './pages/Course';
import Home from './pages/Home';
function App() {
  return (
    <div>
      <Main origin="Home"/>
      <Router>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/courses"  element={<Course />} />
          <Route path="/profile"  element={<Profile />} />
        </Routes>
        <Footer/>
        </Router>
      
      {/* <Main origin="Home"/>
      <Home/> */}
    </div>
  );
}
export default App;