import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [error, setError] = useState('');

    const {signIn, setLoading} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || '/';

    const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
        .then(result =>{
           const user = result.user;
           console.log(user);
           form.reset();
           setError('');
           if(user.emailVerified){
            navigate(from, {replace: true});
           }
           else{
            toast.error('Your Email is not verified. Pleased verified')
           }
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
        .finally(() =>{
          setLoading(false)
        })
          
    }

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
          name="email" type="email" placeholder="Enter email"  required/>
          
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          name="password" type="password" placeholder="Password"  required/>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Form.Text className="text-danger">
            {error}
          </Form.Text>
      </Form>
    );
};

export default Login;
