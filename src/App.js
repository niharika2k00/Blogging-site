
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import firebase from 'firebase';
import app from "./Firebase/Firebase.js";
import NAVBAR from './Components/Navbar/Navbar_top.jsx';
import HOMESCREEN from './Components/Home/Home.jsx';
import CREATE_BLOG from './Components/Blog_Creation/CreateBlog.jsx';
import BLOG from './Components/BlogScreen/BlogScreen.jsx';
import BLOG_DETAILS from './Components/Blog_Individual/BlogDetailsScreen.jsx';


const App = () => {

  const db = firebase.firestore();
  const store = firebase.storage();

  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [USER, set_USER] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [details, setDetailsPopup] = useState(false);
  const [author, setAuthor] = useState('');
  const [heading, setHeading] = useState('');
  const [html, setHtml] = useState('');
  const [coverImg, setCoverImg] = useState(null)
  const [allBlogs, setAllBlogs] = useState([]);




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
        set_USER(User_Obj);
      }
      else {
        console.log('No User');
        set_USER({});
      }
    });
  }, [set_USER]);



  // SAVE METHOD --- (inside PopupDetails.js)
  const Save_handler = async (e) => {
    e.preventDefault();
    console.log("Save handler executed");
    console.log("AUTHOR : ", author, "TITLE : ", heading);
    setDetailsPopup(false);
  };



  // ----------   SINGLE IMAGE UPLOAD METHOD     -----------
  const Img_handle = (e) => {
    if (e.target.files[0])
      setCoverImg(e.target.files[0]);
    console.log("Image handler")
  };


  const UploadCoverImage = async () => {
    try {
      console.log("UploadCoverImage")
      const a = store.ref().child(`Images/Blog-Cover-Image/${coverImg.name}`);
      await a.put(coverImg);
      const downloadURL = await a.getDownloadURL();

      console.log("download url = ", downloadURL);
      return downloadURL;
    }
    catch (error) {
      console.log(error);
    }
  }



  function EditorChangeHandler({ html, text }) {
    console.log('HTML text = ', html)
    // console.log('Mark Down text = ', text)
    document.getElementById("blogBody").innerHTML = html;
    setHtml(html);
    // document.getElementById('blogBody').querySelector('img').classList.add("imgStyle");
    var imageTag = document.getElementById('blogBody').querySelectorAll('img');
    console.log(imageTag);
    for (var i = 0; i < imageTag.length; ++i) {
      imageTag[i].classList.add('imgStyle');                          // apply styling to the pic when render in the same page
    }
  }



  const FetchBlogs = () => {
    if (Object.keys(USER).length !== 0) {
      db.collection('Blogs').onSnapshot(snapshot => {
        const Items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log(Items);
        setAllBlogs(Items)
      })
    }
    else {
      console.log("No user logged in OOPSSS !! ");
    }
  }




  useEffect(() => {
    FetchBlogs()

  }, [])






  return (
    <Router>
      <div id="App" style={{ backgroundColor: "#f4f4f4" }}>
        <NAVBAR />

        <main >
          <div /* className="self_containerFull" */>

            {/* <Route path='/createBlog' component={CREATE_BLOG} exact /> */}

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


            <Route path='/createblog'
              render={(props) => (
                <CREATE_BLOG {...props}
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
                  EditorChangeHandler={EditorChangeHandler}
                  html={html}
                  UploadCoverImage={UploadCoverImage}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}
              exact
            />


            <Route path='/blogs'
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
                  EditorChangeHandler={EditorChangeHandler}
                  html={html}
                  FetchBlogs={FetchBlogs}
                  allBlogs={allBlogs}
                  setAllBlogs={setAllBlogs}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}
              exact
            />



            <Route path='/blog/:id'
              render={(props) => (
                <BLOG_DETAILS {...props}
                  USER={USER}
                  FetchBlogs={FetchBlogs}
                  allBlogs={allBlogs}
                  setAllBlogs={setAllBlogs}
                  loading={loading}
                  setLoading={setLoading}
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
