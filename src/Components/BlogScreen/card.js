
import React from 'react';
import { Button, Card, } from 'react-bootstrap';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';




const card = ({ ID, each_cardObj, USER }) => {



    return (
        <div>

            <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={each_cardObj.coverImg} id="cardImg" />
                <Card.Body>
                    <Card.Title style={{ paddingBottom: "1.3rem", fontWeight: "700" }} >
                        <LinesEllipsis
                            text={each_cardObj.title}
                            maxLine='2'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                        />
                    </Card.Title>

                    <h6> {each_cardObj.Created_At}  </h6>
                    <Card.Text className="textname">
                        - By {each_cardObj.author}
                    </Card.Text>

                    <Button variant="dark" href={`/each/${ID}`} >Know More... </Button>
                </Card.Body>
            </Card>

        </div>
    )
}

export default card;
