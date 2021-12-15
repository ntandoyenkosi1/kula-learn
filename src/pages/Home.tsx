import { Alert, Card, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import Main from "./layout/Main";
import Footer from "./layout/Footer";
const Home=()=>{
  const { user, isAuthenticated } = useAuth0();
  console.log(isAuthenticated)
  console.log(user)
  
    return <div>
        <Main origin="Home"/>
        <Alert variant="success">
            <Alert.Heading><b>Welcome to Kula Learn</b></Alert.Heading>
            <p>
              Use this platform to learn a new skill. Register a new account or login to gain access to our range of online courses we offer here at Kula.
            </p>
            <h5><b>Why choose Kula?</b></h5>
            <ul>
              <li>We offer beginner and more advanced courses.</li>
              <li>We offer Blockchain courses and this site has web3 enabled by default.</li>
              <li>Our courses are free.</li>
              <li>We also keep track of your progress.</li>
              <li>We also offer offline support and the courses are offered in different languages.</li>
            </ul>
            <hr />
            <h5 className="mb-0">
              <b>Explore one of our courses below.</b>
            </h5>
          </Alert>
          <hr />
        <Card className="text-center"  style={{color:"#0f5132"}}>
        <Card.Header> <h4><b>Featured Course</b></h4></Card.Header>
        <Card.Body>
            <Card.Title><h5><b>Introduction to Blockchain</b></h5></Card.Title>
            <Card.Text>
              <p style={{textAlign:"center"}}>
                This course explores the fundamentals of Blockchain. Enroll in this course to gain more information about Blockchain.<br/>
                In this course you will learn what is Blockchain? What are its benefits, advantages, disadvantages and practical use cases.
              </p>
            </Card.Text>
            <Button variant="primary" >Go to course</Button>
        </Card.Body>
        </Card>
        <Footer/>
    </div>
}
export default Home;