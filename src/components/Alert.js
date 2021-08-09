import React from "react";
import {
    Alert,
} from 'react-bootstrap';


export default (props) => {

      return (
        <Alert variant="danger" >
          <Alert.Heading>{props.errorTitle}</Alert.Heading>
          <p>
            {props.error}
          </p>
        </Alert>
      );
  }
  
