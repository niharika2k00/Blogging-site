
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import firebase from 'firebase';
import app from "./Firebase/Firebase.js";
import NAVBAR from './Components/Navbar/Navbar_top.jsx';
import HOMESCREEN from './Components/Home/Home.jsx';
import CREATE_BLOG from './Components/Blog_Creation/CreateBlog.jsx';
import CREATE_BLOG_MD from './Components/Blog_Creation/CreateBlogMD.jsx';
import BLOG from './Components/Blog_Display/Blog.jsx';



const App = () => {

  const db = firebase.firestore();
  const store = firebase.storage();

  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [USER, set_USER] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [details, setDetailsPopup] = useState(false);
  const [author, setAuthor] = useState('');
  const [heading, setHeading] = useState('');
  const [html, setHtml] = useState('')


  const USER_DETAILS = firebase.auth().currentUser;
  // console.log(USER_DETAILS);


  // ----------------------------  USER VALIDATION    --------------------
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {                     // both present
        console.log("USER EXIST")
        console.log(user.displayName, " , ", user.uid);
        const User_Obj = {
          Name: user.displayName,
          Email: user.email,
          UID: user.uid,
        };
        console.log(User_Obj);
        // set_USER(User_Obj);
      }
      else {
        console.log('No User');
        set_USER({});
      }
    });
  }, [set_USER]);



  // SETTING METHOD --- (inside PopupDetails.js)
  const Save_handler = async (e) => {
    e.preventDefault();
    console.log("setting handler executed");
    console.log("AUTHOR : ", author, "TITLE : ", heading);
    setDetailsPopup(false);
  };



  // ----------   SINGLE IMAGE UPLOAD METHOD     -----------
  const Img_handle = (e) => {
    // if (e.target.files[0])
    // setImg(e.target.files[0]);
    console.log("image handler")
  };




  function handleEditorChange({ html, text }) {
    console.log('HTML text = ', html)
    console.log('Mark Down text = ', text)
    document.getElementById("blogBody").innerHTML = html;
    setHtml(html);
    // document.getElementById('blogBody').querySelector('img').classList.add("imgStyle");
    var imageTag = document.getElementById('blogBody').querySelectorAll('img');
    console.log(imageTag);
    for (var i = 0; i < imageTag.length; ++i) {
      imageTag[i].classList.add('imgStyle');
    }
  }





  return (
    <Router>
      <div className="App" style={{ backgroundColor: "white" }}>
        <NAVBAR />

        <main >
          <div /* className="self_containerFull" */>

            {/* <Route path='/createBlogmd' component={CREATE_BLOG_MD} /> */}
            <Route path='/createBlog' component={CREATE_BLOG} exact />

            <Route path='/'
              render={(props) => (
                <HOMESCREEN {...props}
                  signUp={signUp}
                  setSignUp={setSignUp}
                  login={login}
                  setLogin={setLogin}
                  USER={USER}
                  set_USER={set_USER}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmpass={confirmpass}
                  setConfirmpass={setConfirmpass}
                />
              )}
              exact
            />


            <Route path='/createBlogmd'
              render={(props) => (
                <CREATE_BLOG_MD {...props}
                  USER={USER}
                  set_USER={set_USER}
                  heading={heading}
                  setHeading={setHeading}
                  author={author}
                  setAuthor={setAuthor}
                  details={details}
                  setDetailsPopup={setDetailsPopup}
                  Img_handle={Img_handle}
                  Save_handler={Save_handler}
                  handleEditorChange={handleEditorChange}
                  html={html}
                />
              )}
              exact
            />


            <Route path='/blog'
              render={(props) => (
                <BLOG {...props}
                  USER={USER}
                  set_USER={set_USER}
                  heading={heading}
                  setHeading={setHeading}
                  author={author}
                  setAuthor={setAuthor}
                  details={details}
                  setDetailsPopup={setDetailsPopup}
                  Img_handle={Img_handle}
                  Save_handler={Save_handler}
                  handleEditorChange={handleEditorChange}
                  html={html}
                />
              )}
              exact
            />
          </div>


        </main>




      </div>
    </Router>
  )
}

export default App;
