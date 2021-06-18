

import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import '../../STYLES/blogScreen.css';



const carousal = ({ ID, each_cardObj, USER }) => {





    return (
        <div>
            <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={each_cardObj.coverImg} id="carousalImg" />

                <Card.Body>
                    <Link to={`/blog/${ID}`} style={{ color: "black" }}  >
                        <Card.Title style={{ paddingBottom: "1.4rem" }} >
                            <LinesEllipsis
                                className="link-tag"
                                style={{ color: "black" }}
                                text={each_cardObj.title}
                                maxLine='2'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        </Card.Title>
                    </Link>

                    <p className="date">  {each_cardObj.Created_At}  </p>
                    <Card.Text className="textname">
                        -  {each_cardObj.author}
                    </Card.Text>

                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        </div>
    )
}

export default carousal;
