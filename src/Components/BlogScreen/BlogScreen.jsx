

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LOAD from '../Loading.js';
import EACH_CARD from './card.js';
import EACH_CAROUSAL from './carousal.js';
import '../../STYLES/blogScreen.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';




const Blog = ({ FetchBlogs, allBlogs, USER, loading, setLoading, leftCards, setLeftCards, rightCarousal, setRightCarousal }) => {

    const [currBlogItems, setcurrBlogItems] = useState([]);
    const BlogLength = allBlogs.length;
    var width = window.innerWidth;



    useEffect(() => {
        if (Object.keys(USER).length !== 0) {
            setLoading(true);
            FetchBlogs();
            console.log(allBlogs);            // array of Object
            // console.log(allBlogs.length);
            setLoading(false);
        }
        else {
            console.log("No User Logged In");
        }
    }, [USER, allBlogs.length]);



    useEffect(() => {
        const m = Math.floor(allBlogs.length / 2);
        const [leftSide, rightSide] = [allBlogs.slice(0, m), allBlogs.slice(m, allBlogs.length)];
        setLeftCards(leftSide);
        setRightCarousal(rightSide);
        console.log(leftSide);
        console.log(rightSide);
    }, [allBlogs.length])




    // -----------------     SORT USING DATES     ----------------
    useEffect(() => {
        if ((Object.keys(USER).length !== 0) && (allBlogs.length !== 0)) {
            setLoading(true);
            const blogsClone = [...allBlogs];
            blogsClone.sort(function (a, b) {
                return (b.Date) - (a.Date);
            });
            setcurrBlogItems(blogsClone);
            // console.log(blogsClone);
            setLoading(false);
        }
    }, [USER, allBlogs.length])






    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }







    return (
        <div className="self-container" >

            <section id="parallax" className="parallax">
                <div className="container" data-aos="zoom-in">
                    <div className="text-center">
                        <h2>BLOGS</h2>
                        <p>
                            <i className="fas fa-quote-left" style={{ paddingRight: "1rem" }} ></i>
                            Problems are not stop signs, they are guidelines...    – Robert H. Schiuller
                            <i className="fas fa-quote-right" style={{ paddingLeft: "1rem" }} ></i>
                        </p>
                        <a className="parallax-btn" href="/createblog">
                            <i className="fas fa-plus-circle" style={{ fontSize: "1.3rem" }} > </i>   Create
                        </a>
                    </div>
                </div>
            </section>


            {
                loading ? <LOAD /> :
                    (width < 970) && (currBlogItems && currBlogItems.length !== 0) ?
                        (
                            // -----------------------      FOR MOBILE VIEW          ---------------------------
                            <section>
                                <Row>
                                    <Card style={{ width: '100%' }}>
                                        <Link to={`/blog/${currBlogItems[0].id}`} >
                                            <Card.Img variant="top" src={currBlogItems[0].coverImg} href={`/blog/${currBlogItems[0].id}`} />
                                        </Link>

                                        <Card.Body>
                                            <Card.Title> {currBlogItems[0].title} </Card.Title>
                                            <Card.Text>
                                                - By {currBlogItems[0].author}
                                            </Card.Text>
                                            <p className="date" style={{ margin: ".6rem" }} >  Latest </p>
                                            <p className="date"  >  {currBlogItems[0].Created_At}  </p>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </section>
                        ) :

                        (  // -----------------------      FOR LAPTOP VIEW          ---------------------------
                            <section>
                                {loading ? <LOAD /> :
                                    currBlogItems && currBlogItems.length !== 0 ?
                                        (
                                            <div className="container-fluid">
                                                <div className="row" style={{ justifyContent: "center", alignItems: "center", margin: "auto", paddingBottom: "3rem" }}>
                                                    <div className="col-lg-9 col-sm-12 col-xs-12 col-md-9 mt-3 shadow">
                                                        <div className="card"  >
                                                            <div className="card-horizontal">
                                                                <div className="img-square-wrapper">
                                                                    <Link to={`/blog/${currBlogItems[0].id}`} >
                                                                        <img className="latestCard-img" src={currBlogItems[0].coverImg} alt="Card image " />
                                                                    </Link>
                                                                </div>
                                                                <div className="card-body">
                                                                    <h4 className="card-title"> {currBlogItems[0].title}   </h4>
                                                                    <h6> -- By {currBlogItems[0].author}  </h6>
                                                                    <p className="date" style={{ margin: ".6rem" }} >  Latest </p>
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
                        )
            }




            {
                loading ? <LOAD /> :
                    leftCards && leftCards.length !== 0 ?
                        (
                            <section style={{ padding: "1rem 0 ", margin: "1rem 0" }} >
                                <Row style={{ padding: "3rem auto" }} >
                                    {leftCards.map(card => (
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
                        ) : []
            }



            <section className="padding-tb">


                <div className="carousalBackground" >

                </div>




                <div>
                    <Carousel responsive={responsive}>
                        {rightCarousal && rightCarousal.map(card => (
                            (<div id="carouMargin">
                                <EACH_CAROUSAL
                                    ID={card.id}
                                    each_cardObj={card}
                                    USER={USER}
                                />
                            </div>

                            )
                        ))}

                        {/*  <div>sajflkdjfl;afd</div>
                    <div>sajflkdjfl;afd</div>
                    <div>sajflkdjfl;afd</div> */}



                    </Carousel>
                </div>





            </section>


        </div >
    )
}

export default Blog;
