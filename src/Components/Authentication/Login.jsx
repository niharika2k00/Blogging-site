
import React from 'react';
import { Form } from 'react-bootstrap';
import CancelIcon from '@material-ui/icons/Cancel';
import '../../STYLES/authentication.scss';
import app from "../../Firebase/Firebase.js";
import { useHistory } from "react-router-dom";
import LOAD from '../Loading.js';



const Login = ({ setLogin, email, setEmail, password, setPassword, loading, setLoading }) => {

    let history = useHistory();


    // LOGIN / SIGNIN handler  -----> for exsisting user
    const Login_handler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const userCredential = await app.auth().signInWithEmailAndPassword(email, password);
            console.log(userCredential);
            const User = userCredential.user;
            console.log(User.displayName);
            setLogin(false);
            setLoading(false);
            history.push('/createblog');

        } catch (error) {
            console.log(error);
            setLogin(false);
        }
    };





    return (
        <div className="SignUppop-up">
            {
                loading ? <LOAD /> :
                    (
                        <div className="SignUpinput-box">
                            <CancelIcon onClick={() => setLogin(false)} className="cross-btn" />
                            <h1 className="loginhead"> Login </h1>

                            <Form onSubmit={Login_handler} className="login_form">
                                <Form.Group controlId='email'>
                                    <Form.Control
                                        className="form_box"
                                        type='email'
                                        placeholder='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='password'>
                                    <Form.Control
                                        className="form_box"
                                        type='password'
                                        placeholder='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <div className="btncenter">
                                    <button type='submit' className="btn btn-dark">Login</button>
                                </div>
                            </Form>

                        </div>
                    )
            }
        </div>
    )
}

export default Login;
