
import React, { useState, useEffect } from 'react';
import '../../STYLES/blogCreate.css';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


const CreateBlog = () => {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);


    let _contentState = ContentState.createFromText('Start writting Blog ...');
    const raw = convertToRaw(_contentState)
    const [contentState, setContentState] = useState(raw)             // ContentState JSON
    const [convertedContent, setConvertedContent] = useState(null);





    /*     // EditorState provides a method getCurrentContent()   <-----    returns the current content of the editor which we can then convert to HTML. 
        const convertContentToHTML = () => {
            let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
            setConvertedContent(currentContentAsHTML);
        }
        const handleEditorChange = (state) => {
            setEditorState(state);
            convertContentToHTML();
        } */



    return (
        <div className="self-container" >
            BLOG
            <Editor
                // onChange={setEditorState}

                editorState={editorState}
                onEditorStateChange={setEditorState}        // If we want to create a controlled editor

                defaultContentState={contentState}            // initialize editor state with once it has been created
                onContentStateChange={setContentState}        //  A function called when there is a change in editor state 

                // editorState={editorState}
                // onEditorStateChange={handleEditorChange}

                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />


            <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>
    )
}

export default CreateBlog;
