import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
//import { useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Footer from '../layout/Footer';
import Main from '../layout/Main';
import Loading from './Loading';

const Profile = () => {
  const { user } = useAuth0();
  // useEffect(()=>{
  //   console.log(user)
  // },[user])
  return (
    <div>
      <Main origin="Profile"/>
      <Alert>
        <Alert.Heading as="h2">Profile Information</Alert.Heading>
          <h3>{user?.name}</h3>
      </Alert>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={user?.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          Name: <h2>{user?.name}</h2>
          Email: <p className="lead text-muted">{user?.email}</p>
        </div>
      </div>
      <Button>Edit Profile</Button>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <Footer/>
    </div>
  );
};
export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
