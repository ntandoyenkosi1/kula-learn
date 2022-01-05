//import HomeSideBar from './layout/HomeSideBar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import BgImg from "./images/book.png";
import Profile from './pages/auth/Profile';
import Course from './pages/course/Course';
import Home from './pages/Home';
import Create from "./pages/course/Create";
import Courses from "./pages/course/Courses";
import Edit from "./pages/course/Edit";
const App=()=> {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/"  element={<Home />} />
          {/* <Route path="/course"/> */}
          <Route path="/course/:id" element={<Course />}/>
          <Route path="/course/edit/:id" element={<Edit/>}/>
          <Route path="/courses"  element={<Courses />} />

          <Route path="/profile"  element={<Profile />} />
          <Route path="/courses/create"  element={<Create />} />
        </Routes>
        </Router>
    </div>
  );
}
export default App;