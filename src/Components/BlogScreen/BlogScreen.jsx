

import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import LOAD from '../Loading.js';
import EACH_CARD from './card.js';
import '../../STYLES/blogScreen.css';



const Blog = ({ html, details, setDetailsPopup, author, setAuthor, heading, setHeading, Save_handler, Img_handle, FetchBlogs, setAllBlogs, allBlogs, USER
    , loading, setLoading }) => {

    const [currBlogItems, setcurrBlogItems] = useState([]);
    const BlogLength = allBlogs.length;

    useEffect(() => {
        if (Object.keys(USER).length !== 0) {
            FetchBlogs();
            console.log(allBlogs);            // array of Object
            console.log(allBlogs.length);
        }
        else {
            console.log("No User Logged In");
        }
    }, [USER, allBlogs.length]);




    // -----------------     SORT USING DATES     ----------------
    useEffect(() => {
        if ((Object.keys(USER).length !== 0) && (allBlogs.length !== 0)) {
            const blogsClone = [...allBlogs];
            blogsClone.sort(function (a, b) {
                return (b.Date) - (a.Date);
            });
            setcurrBlogItems(blogsClone);
            console.log(blogsClone);
        }
    }, [USER, allBlogs.length])













    return (
        <div className="self-container">

            <section id="parallax" className="parallax">
                <div className="container" data-aos="zoom-in">
                    <div className="text-center">
                        <h2>BLOGS</h2>
                        <p>
                            <i class="fas fa-quote-left"></i>
                            Problems are not stop signs, they are guidelines...    – Robert H. Schiuller
                            <i class="fas fa-quote-right"></i>
                        </p>
                        <a className="parallax-btn" href="/createblog">
                            <i className="fas fa-plus-circle" style={{ fontSize: "1.3rem" }} > </i>   Create
                        </a>
                    </div>
                </div>
            </section>



            <section  >
                {loading ? <LOAD /> :
                    currBlogItems && currBlogItems.length !== 0 ?
                        (
                            <div className="container-fluid">
                                <div className="row" style={{ justifyContent: "center", alignItems: "center", margin: "auto" }}>
                                    <div className="col-lg-9 col-sm-12 col-xs-12 col-md-9 mt-3">
                                        <div className="card" style={{ borderRadius: "1rem" }}  >
                                            <div className="card-horizontal">
                                                <div className="img-square-wrapper">
                                                    <img className="latestCard-img" /* href={`/blog/${ID}`} */ src={currBlogItems[0].coverImg} alt="Card image cap" />
                                                </div>
                                                <div className="card-body">
                                                    <h4 className="card-title"> {/* {allBlogs[BlogLength - 1].title} */} {currBlogItems[0].title}   </h4>
                                                    <h6> -- By {currBlogItems[0].author}  </h6>
                                                    <p className="date"  >  {currBlogItems[0].Created_At}  </p>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <small >Last updated 1 min ago</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : []
                }
            </section>



            {loading && allBlogs.length !== 0 ? <LOAD /> :
                (
                    <section style={{ padding: "1rem 0 ", margin: "1rem 0" }} >

                        <Row style={{ padding: "3rem auto" }} >
                            {allBlogs.map(card => (
                                (<Col key={card.id} lg={3} md={4} sm={12} xs={12} className="hovercard" style={{ marginBottom: "1rem" }}>
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
