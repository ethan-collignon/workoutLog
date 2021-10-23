import React from 'react';
import { Container, Row, Col } from 'reactstrap'; //importing bootstrap tools that allow us to use its grid system
import Signup from './Signup';
import Login from './Login';


const Auth = (props) => {//Function Component(stateless component that accepts data and displays it in some form) that pulls in the Prop that is passed down 
    return(
        <Container className="auth-container">
            <Row>
                <Col md="6">
                    <Signup updateToken={props.updateToken}/*Created a prop called updateToken. Allows us to pass the token down to our signup function. NOT THE SAME updateToken AS IN APP.JS COMPONENT*//> 
                </Col>
                <Col md="6" className="login-col">
                    <Login updateToken={props.updateToken}/*Created a prop called updateToken. Allows us to pass the token down to our signup function. NOT THE SAME updateToken AS IN APP.JS COMPONENT*//>
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;