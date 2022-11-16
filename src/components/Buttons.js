import React from "react";
import { Button } from "reactstrap";
function Buttons(props) {
  return (
    <div>
      <Button
        color={props.color}
        outline={props.outline}
        onClick={props.onClick}
        text={props.text}
      >
        {props.text}
      </Button>
    </div>
  );
}
export default Buttons;
