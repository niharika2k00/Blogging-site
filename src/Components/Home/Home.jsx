
import React from 'react';
import '../../STYLES/home.css';
import SIGNUP_POPUP from '../Authentication/SignUp.jsx';
import LOGIN_POPUP from '../Authentication/Login.jsx';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import app from "../../Firebase/Firebase.js";


const Home = ({ signUp, setSignUp, login, setLogin, USER, set_USER, name, setName, email, setEmail, password, setPassword, confirmpass, setConfirmpass }) => {

    let history = useHistory();

    const handle_LogOut = () => {
        app.auth().signOut();
        console.log("Successfully Logged out ", name);
        set_USER({});
        history.push('/');
    };






    return (
        <div className="home-bg home"  >
            <div className="self-container homeStyle">
                <h2>BLOGGING WEBSITE</h2>


                {/* --------------  LOGIN  POPUP   -- for exsisting user------------ */}
                {
                    login && <LOGIN_POPUP
                        setLogin={setLogin}
                        setSignUp={setSignUp}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        name={name}
                        setPassword={setPassword}
                    />
                }

                {/* --------------  SIGNUP  POPUP(REGISTER) -- for new user ------------ */}
                {
                    signUp && <SIGNUP_POPUP
                        setSignUp={setSignUp}
                        setLogin={setLogin}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        confirmpass={confirmpass}
                        setConfirmpass={setConfirmpass}
                        USER={USER}
                        set_USER={set_USER}
                    />
                }


                <button type="button" className="btn btn-dark pad" onClick={() => setSignUp(true)} > Register </button>
                <button type="button" className="btn btn-dark pad" onClick={() => setLogin(true)}>Sign In</button>
                <button type="button" className="btn btn-dark pad" onClick={() => handle_LogOut()}>Logout</button>

            </div>
        </div >
    )
}

export default Home;
