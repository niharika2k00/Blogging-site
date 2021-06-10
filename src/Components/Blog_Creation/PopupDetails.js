

import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CancelIcon from '@material-ui/icons/Cancel';
import '../../STYLES/blogCreate.css';
// import firebase from 'firebase';




const Popup = ({ type, setDetailsPopup, author, setAuthor, heading, setHeading, Save_handler, Img_handle }) => {

    // const db = firebase.firestore();
    // const store = firebase.storage();





    return (
        <div>
            <div className="pop-up">
                <div className="input-box" /* onSubmit={Setting_handler} */>
                    <CancelIcon onClick={() => setDetailsPopup(false)} className="cross-btn" />
                    <h5 style={{ color: "#f99459" }} >Blog Details  </h5>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='author'>
                                <Form.Label><b>Author <span style={{ color: 'crimson' }}>*</span> </b></Form.Label>
                                <Form.Control
                                    className="form_box"
                                    type='author'
                                    placeholder='author name'
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    required
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='title'>
                                <Form.Label><b>Blog Title <span style={{ color: 'crimson' }}>*</span> </b></Form.Label>
                                <Form.Control
                                    className="form_box"
                                    type='title'
                                    placeholder='blog title here ... '
                                    value={heading}
                                    onChange={(e) => setHeading(e.target.value)}
                                    required
                                ></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <div className="card" style={{ width: '18rem' }} className="pro_card">
                                <div className="card-body">
                                    {/* <h5 className="card-title">Upload Cover Picture</h5> */}

                                    <Form.Group style={{ color: "black" }} >
                                        <Form.File
                                            id="exampleFormControlFile1"
                                            label="Upload Cover Picture"
                                            onChange={Img_handle}
                                            required
                                        />
                                    </Form.Group>

                                </div>
                            </div>
                        </Col>
                    </Row>



                    <div className="btncenter">
                        <Button type='button' variant='dark' onClick={Save_handler}  >
                            <b style={{ fontSize: "16px" }}>Blog Saved</b>
                        </Button>
                    </div>


                </div>
            </div>
        </div >
    )
}

export default Popup
