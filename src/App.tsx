import './App.css';
//import HomeSideBar from './layout/HomeSideBar';
import Main from './layout/Main';
//import Course from './pages/Course';
import Home from './pages/Home';
function App() {
  return (
    <div>
      <Main origin="Home"/>
      <Home/>
    </div>
  );
}
export default App;