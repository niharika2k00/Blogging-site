

import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { Nav, Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
// import ReactMarkdown from 'react-markdown';
// import { render } from 'react-dom';
import firebase from 'firebase';
// import app from "../../Firebase/Firebase.js";
import DETAILS from './PopupDetails.js';
import '../../STYLES/blogCreate.css';
// const gfm = require('remark-gfm');



// BLOG CREATION USING MARK DOWN
const CreateBlogMD = ({ details, setDetailsPopup, author, setAuthor, heading, setHeading, Save_handler, Img_handle, EditorChangeHandler, html, UploadCoverImage }) => {

    const db = firebase.firestore();
    const store = firebase.storage();

    const [blogId, setBlogId] = useState([]);



    const mdParser = new MarkdownIt(/* Markdown-it options */);



    // var src = "#### Load the markdown *document* **jjk** ## Header"   
    const mark = `Just a link: https://reactjs.com.`




    useEffect(() => {
        document.getElementById("blogBody").innerHTML = "hello";

    }, []);


    useEffect(() => {
        console.log("AUTHOR : ", author);
    })


    // Timestamp
    const date = new Date();
    const modifiedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`  // 12 May, 2021



    const BlogSubmit_Handler = async (e) => {
        e.preventDefault();
        const currentUser = firebase.auth().currentUser;

        try {
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
        }
        catch (error) {
            console.log(error);
        }
    }





    return (
        <div className="self-container" >
            <h4 style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} > BLOG USING MARK DOWN</h4>


            <Form id="login_form" onSubmit={BlogSubmit_Handler} >
                <Form.Group controlId='title'>
                    {/* <h5 style={{ color: "#ffa200" }} >Please fill all the fields .... </h5> */}
                    <Form.Label><b style={{ fontSize: "1.2rem" }} >Details<span style={{ color: 'crimson' }}>*</span> </b></Form.Label>
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
                            <i className="fas fa-heart ico_big"></i>
                        </label>
                    </div>
                </Form.Group>



                <div id="centerbtn">
                    <Button type='submit' variant='danger' /* disabled={loading}  */ style={{ marginTop: "1rem" }}  >
                        <b style={{ fontSize: "16px" }}>Submit Post</b>
                    </Button>
                </div>
            </Form>



            <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={EditorChangeHandler}
            />


            {/* <ReactMarkdown># Hello, *world*!</ReactMarkdown> */}
            {/* <ReactMarkdown remarkPlugins={[gfm]} children={src} /> */}
            {/* <ReactMarkdown source={src} /> */}




            <h1>{heading}</h1>
            <h5>{author} </h5>

            <div id="blogBody" >

            </div>
        </div>
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