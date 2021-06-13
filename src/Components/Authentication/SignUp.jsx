
import React from 'react';
import { Form } from 'react-bootstrap';
import CancelIcon from '@material-ui/icons/Cancel';
import '../../STYLES/authentication.scss';
import app from "../../Firebase/Firebase.js";
import firebase from 'firebase';
import { useHistory } from "react-router-dom";
import LOAD from '../Loading.js';



const SignUp = ({ setSignUp, name, setName, email, setEmail, password, setPassword, confirmpass, setConfirmpass, loading, setLoading }) => {

    const history = useHistory();
    const db = firebase.firestore();



    const signUp_Handler = async (e) => {
        e.preventDefault();
        if (password !== confirmpass) {
            console.log("Wrong password");
            alert("Wrong password.Password doesn't Match");
            return;
        }

        try {
            // ----------- SignUp   --------
            setLoading(true);
            const result = await app.auth().createUserWithEmailAndPassword(email, password);
            console.log(result);
            await result.user.updateProfile({
                displayName: name,
            });
            console.log("Name : ", result.user.displayName);
            setSignUp(false);
            // history.push("/");

            // --------- Putting into DB --------
            const USER_CURRENT = firebase.auth().currentUser;
            console.log(USER_CURRENT);
            const User_obj = {
                Name: name,
                Email: email,
                CreatedAt: new Date(),
                Provider: "Custom",
            }
            console.log(User_obj);
            await db.collection('Admins').doc(USER_CURRENT.uid).set(User_obj);
            alert("Message summited Successfully!");
            setName('');
            setEmail('');
            setConfirmpass('');
            setPassword('');
            setLoading(false);
            history.push('/createblog');
        }
        catch (error) {
            console.log(error);
            setSignUp(false);
        }
    };







    return (
        <div className="SignUppop-up">
            {
                loading ? <LOAD /> :
                    (
                        <div className="SignUpinput-box">
                            <CancelIcon onClick={() => setSignUp(false)} className="cross-btn" />

                            <h1 className="loginhead"> Register </h1>


                            <Form onSubmit={signUp_Handler} className="login_form">
                                <Form.Group controlId='name'>
                                    <Form.Control
                                        className="form_box"
                                        type='name'
                                        placeholder='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

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

                                <Form.Group controlId='confirmpassword'>
                                    <Form.Control
                                        className="form_box"
                                        type='password'
                                        placeholder='confirm password'
                                        value={confirmpass}
                                        onChange={(e) => setConfirmpass(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>


                                <div className="btncenter">
                                    <button type='submit' className="btn btn-dark">Register</button>
                                </div>
                            </Form>
                        </div>
                    )
            }

        </div>
    )
}

export default SignUp;
