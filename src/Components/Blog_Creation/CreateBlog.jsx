

import React from 'react';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { Form, Button } from 'react-bootstrap';
// import ReactMarkdown from 'react-markdown';
// import { render } from 'react-dom';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
// import app from "../../Firebase/Firebase.js";
import DETAILS from './PopupDetails.js';
import '../../STYLES/blogCreate.css';
import LOAD from '../Loading.js';
import MESS from '../Message.js';
import '../../STYLES/home.css';
import '../../index.css';
import SIGNUP_POPUP from '../Authentication/SignUp.jsx';
import { useHistory } from "react-router-dom";



// const gfm = require('remark-gfm');




// BLOG CREATION USING MARK DOWN
const CreateBlogMD = ({ details, setDetailsPopup, author, setAuthor, heading, setHeading, Save_handler, Img_handle, EditorChangeHandler, html, UploadCoverImage, loading,
    setLoading, successMessage, setSuccessMessage, signUp, setSignUp, name, setName, email, setEmail, password, setPassword, confirmpass, setConfirmpass,
    warningMessage, setWarningMessage }) => {




    let history = useHistory();
    const store = firebase.storage();
    const db = firebase.firestore();
    const mdParser = new MarkdownIt();
    // var src = "#### Load the markdown *document* **jjk** ## Header"   
    const mark = `Just a link: https://reactjs.com.`

    // Timestamp
    const date = new Date();
    const modifiedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`  // 12 May, 2021


    /* useEffect(() => {
        document.getElementById("blogBody").innerHTML = "hello";
    }, []); */


    const redirect = () => {
        history.push('/blogs');
    }


    const BlogSubmit_Handler = async (e) => {
        e.preventDefault();
        const currentUser = firebase.auth().currentUser;

        try {
            setLoading(true);
            console.log("BlogSubmit_Handler running");
            const COVER_IMAGE = await UploadCoverImage();

            const blog = {
                author: author,
                title: heading,
                coverImg: COVER_IMAGE,
                body: html,
                admin_uid: currentUser.uid,
                Created_At: modifiedDate,
                Date: Date.now(),
            }
            console.log("EACH BLOG ====> ", blog);


            const BLOG = await db.collection('Blogs').add(blog);
            console.log(BLOG.id)

            /*  const arrBlog = [...blogId];
             arrBlog.push(BLOG.id)
             console.log(arrBlog) */
            // await db.collection('Admins').doc(currentUser.uid).collection('self_blogs').doc(BLOG.id).set(blog);
            setLoading(false);
            setSuccessMessage("Blog successfully submitted ... ");
        }
        catch (error) {
            console.log(error);
            setWarningMessage("ERROR : Oopss Something went wrong !")
        }
    }



    const ImageUploadHandler = async (file, callback) => {
        console.log("file : ", file);
        const Picture = await uploadImg(file);
        console.log(Picture);
        callback(Picture);
    }



    const uploadImg = async (file) => {
        try {
            console.log("UploadImage  : ", file)
            const a = store.ref().child(`Images/Blog-Cover-Image/${file.name}`);
            await a.put(file);
            const downloadURL = await a.getDownloadURL();
            console.log("download url = ", downloadURL);
            return downloadURL;
        }
        catch (error) {
            console.log(error);
        }
    }





    return (
        <div className="self-container" style={{ paddingBottom: "10rem" }} >
            <h4 id="createHead" > Create Your Own Blog</h4>


            {/* --------------  SIGNUP  POPUP(REGISTER) -- for new user ------------ */}
            {
                signUp && <SIGNUP_POPUP
                    setSignUp={setSignUp}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmpass={confirmpass}
                    setConfirmpass={setConfirmpass}
                    setLoading={setLoading}
                    loading={loading}
                />
            }

            <div className="d-flex justify-content-end  buttonPadding "   >
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="submit" onClick={redirect} className="btn" style={{ backgroundColor: "#5ab1ad", color: "white" }}>
                        <h6 style={{ marginTop: ".1rem", marginBottom: ".1rem", color: "white" }} >  <i className="fas fa-eye"></i> All Blogs</h6>
                    </button>
                    <button type="button" className="btn " onClick={() => setSignUp(true)} style={{ backgroundColor: "#ffc156", color: "white" }}  >
                        <h6 style={{ marginTop: ".1rem", marginBottom: ".1rem", color: "white" }}> <i className="fas fa-plus-circle"></i>  Add Admin</h6>
                    </button>
                </div>
            </div>



            {warningMessage && <MESS variant='danger'>{warningMessage}</MESS>}
            {successMessage && <MESS variant='success'>{successMessage}</MESS>}

            {
                loading ? <LOAD /> :
                    (
                        <Form id="login_form"   /* onSubmit={BlogSubmit_Handler}  */>
                            <Form.Group controlId='title'>
                                <Form.Label><b style={{ fontSize: "1.2rem" }} >Details<span style={{ color: 'crimson' }}>*</span></b> (Fill all the fields compulsory) </Form.Label>
                                {
                                    details && <DETAILS
                                        type='setting'
                                        author={author}
                                        setAuthor={setAuthor}
                                        heading={heading}
                                        setHeading={setHeading}
                                        setDetailsPopup={setDetailsPopup}   /* true paasss */
                                        Save_handler={Save_handler}
                                        Img_handle={Img_handle}
                                    />
                                }

                                <div className='file file--upload' >
                                    <label onClick={() => setDetailsPopup(true)}>
                                        <i className="fas fa-info-circle ico_big"></i>
                                    </label>
                                </div>
                            </Form.Group>
                            {/* <input type="button">   ------>   is just a button and won't do anything by itself. 
                                <input type="submit">   ------>    when inside a form element, will submit the form when clicked. */}
                        </Form>
                    )
            }


            <section className="padding-tb" >
                <MdEditor
                    style={{ height: "650px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={EditorChangeHandler}
                    onImageUpload={ImageUploadHandler}
                    placeholder={"Start writing your Blog..."}
                />

            </section>


            <div id="centerbtn">
                <Button type='submit' variant='dark' style={{ marginTop: "1rem" }} onClick={BlogSubmit_Handler} >
                    <b style={{ fontSize: "18px" }}>Submit Blog</b>
                </Button>
            </div>


            {/* <ReactMarkdown># Hello, *world*!</ReactMarkdown> */}
            {/* <ReactMarkdown remarkPlugins={[gfm]} children={src} /> */}
            {/* <ReactMarkdown source={src} /> */}


            {/* <h1>{heading}</h1>
            <h5>{author} </h5>

            <div id="blogBody" >
            </div> */}


        </div >
    )
}

export default CreateBlogMD;

















/*

#### Maze Runner

![](https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80)

***Hellooo strawberry***

*An ID should be unique within a page. However, if more than one element with the **specified ID** exists, the getElementById() method returns the first element in the source code.*

![](https://images.unsplash.com/photo-1452827073306-6e6e661baf57?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80)

*/
