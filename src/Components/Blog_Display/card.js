
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import LOAD from '../Loading.js';
import { Link } from "react-router-dom";



const card = ({ ID, each_cardObj, USER }) => {






    return (
        <div>

            <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={each_cardObj.coverImg} />
                <Card.Body>
                    <Card.Title>{each_cardObj.title}</Card.Title>
                    <Card.Text>
                        {/* {each_cardObj.body} */}
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button variant="primary" href={`/blog/${ID}`} >Go somewhere</Button>
                </Card.Body>
            </Card>

        </div>
    )
}

export default card;
