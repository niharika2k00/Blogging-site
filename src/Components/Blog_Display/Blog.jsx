

import React, { useState, useEffect } from 'react';

const Blog = ({ html, details, setDetailsPopup, author, setAuthor, heading, setHeading, Save_handler, Img_handle, handleEditorChange }) => {


    useEffect(() => {
        console.log("name : ", author)
    }, [])


    return (
        <div className="self-container">
            asdf
            <h1>{heading}</h1>
            <h5>{author} </h5>
            <div id="blogBody" >

            </div>

        </div>
    )
}

export default Blog;
