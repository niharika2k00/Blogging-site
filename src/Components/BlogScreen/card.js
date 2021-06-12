
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card, } from 'react-bootstrap';
import LOAD from '../Loading.js';
import { Link } from "react-router-dom";
import LinesEllipsis from 'react-lines-ellipsis';



const card = ({ ID, each_cardObj, USER }) => {






    return (
        <div>

            <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={each_cardObj.coverImg} id="cardImg" />
                <Card.Body>
                    <Card.Title style={{ paddingBottom: "1.4rem" }} >
                        <LinesEllipsis
                            text={each_cardObj.title}
                            maxLine='2'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                        />
                    </Card.Title>

                    <h6> {each_cardObj.Created_At}  </h6>
                    <Card.Text>
                        - By {each_cardObj.author}
                    </Card.Text>

                    <Button variant="dark" href={`/blog/${ID}`} >Know More... </Button>
                </Card.Body>
            </Card>

        </div>
    )
}

export default card;
