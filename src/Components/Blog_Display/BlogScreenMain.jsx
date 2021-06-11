

import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import LOAD from '../Loading.js';
import EACH_CARD from './card.js';




const Blog = ({ html, details, setDetailsPopup, author, setAuthor, heading, setHeading, Save_handler, Img_handle, FetchBlogs, setAllBlogs, allBlogs, USER
    , loading, setLoading }) => {


    useEffect(() => {
        if (Object.keys(USER).length !== 0) {
            FetchBlogs();
            console.log(allBlogs);            // array of Object
        }
    }, [setAllBlogs, USER]);


    return (
        <div className="self-container">

            {loading && allBlogs.length !== 0 ? <LOAD /> :
                (
                    <section style={{ padding: "1rem 0 ", margin: "1rem 0" }} >

                        <Row style={{ padding: "3rem auto" }} >
                            {allBlogs.map(card => (
                                (<Col key={card.id} lg={3} md={4} sm={12} xs={12} className="hovercard" style={{}}>
                                    <EACH_CARD
                                        ID={card.id}
                                        each_cardObj={card}
                                        USER={USER}
                                    />
                                </Col>)
                            ))}
                        </Row>
                    </section>
                )
            }


        </div>
    )
}

export default Blog;
