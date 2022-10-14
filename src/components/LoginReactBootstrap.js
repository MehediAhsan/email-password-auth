import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const LoginReactBootstrap = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleLogin = event => {
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
        .then( result => {
            const user = result.user;
            console.log(user);
            setSuccess(true);
            form.reset();
        })
        .catch( error => {
            console.error('error', error);
        })
    }

    const handleEmailBlur = event =>{
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    const handleForgetPassword = () => {
        if(!userEmail){
            alert('Please enter your email address')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then( () => {
            alert('Password reset email sent. Please check your email.')
        })
        .catch( error => {
            console.error('error:', error);
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-primary'>Please Login</h3>
            <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onBlur={handleEmailBlur} type="email" name="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required />
            </Form.Group>
            {success && <p className='text-success'>Successfully Login</p>}
            <Button variant="primary" type="submit">
                Login
            </Button>
            </Form>

            <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
            <p><small>Forgot password? <button type='button' onClick={handleForgetPassword} className='btn btn-link'>Reset Password</button></small></p>
        </div>
    );
};

export default LoginReactBootstrap;