import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Profile from './pages/auth/Profile'
import Course from './pages/course/Course'
import Home from './pages/Home'
import Create from './pages/course/Create'
import Courses from './pages/course/Courses'
import Edit from './pages/course/Edit'
import EditModule from './pages/course/EditModule'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Development from './pages/layout/Development'
import Admin from './pages/portal/Admin'
import Student from './pages/portal/Student'
import Instructor from './pages/portal/Instructor'
import NotFound from './pages/error/NotFound'
import NotAuthorized from './pages/error/NotAuthorized'
const App = () => {
    return (
        <div>
            <Development />
            <Router>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/create" element={<Create />} />
                    <Route path="/course/:id" element={<Course />} />
                    <Route path="/course/edit/:id" element={<Edit />} />
                    <Route path="/module/:id" element={<EditModule />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/instructor" element={<Instructor />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/error" element={<NotAuthorized />} />
                </Routes>
            </Router>
        </div>
    )
}
export default App
