import React from "react";

import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";

function Cards(props) {
  return (
    <div>
      <Card body color={props.color} inverse fontWeight="bold">
        <CardBody>
          <CardTitle tag="h3">{props.title}</CardTitle>
          <CardSubtitle tag="h5">{props.subtitle} </CardSubtitle>
          <br />
          <CardText tag="h6">{props.text}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default Cards;
