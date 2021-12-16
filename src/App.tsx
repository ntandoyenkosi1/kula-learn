//import HomeSideBar from './layout/HomeSideBar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import BgImg from "./images/book.png";
import Profile from './pages/auth/Profile';
import Course from './pages/Course';
import Home from './pages/Home';
const App=()=> {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/courses"  element={<Course />} />
          <Route path="/profile"  element={<Profile />} />
        </Routes>
        </Router>
    </div>
  );
}
export default App;