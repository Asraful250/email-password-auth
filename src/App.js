import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState } from 'react';


const auth = getAuth(app);

function App() {
 
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailBlur = event => {
    setEmail(event.target.value)
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value);
  }

  const handleRegisteredChange = event =>{
    setRegistered(event.target.checked);
  }
 
  // const hanldeRegisteredChange = event =>{
  //   setRegistered(event.target.check)
  // }

  // if(! /(?=.*[#?!@$%-])/.test(password)){
  //   setError('');
  //   return;
  // }

  const handleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if(!/(?=.*[a-zA-Z >>!#$%&? "<<])/.test(password)){
      setError('Password Should Contain Atleast One Special Character')
      return;
    }

    setValidated(true);
    setError('');

    if(registered) {
      console.log(email, password)
      signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setEmail('');
        setPassword('');
        verifyEmail();
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      })
    }
    event.preventDefault();
  }
  
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
    .then( () => {
      console.log('email sent')
    })
  }
  
  const verifyEmail = () => {
    sendEmailVerification(auth. currentUser)
    .then( () => {
      console.log('Email Verification Sent')
    })
  }

  return (
    <div>
      <div className="registration w-50 mx-auto mt-5">
        <h2 className='text-primary'>Please {registered ? 'Log In' : 'Register'}!!</h2>
        <Form noValidate  validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a email?
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a password?
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already rgistered?" />
            </Form.Group>
          <p className="text-danger">{error}</p>
          <Button onClick={handlePasswordReset}variant="link">Forget Password?</Button>
          <br />
          <Button variant="primary" type="submit">
            {registered ?'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
