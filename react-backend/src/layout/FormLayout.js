import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../css/main.css';

function FormLayout(props) {
    return (
        <div className="background__color__grey">
            <Container fluid="sm" className="center">
                <Row className="mx-auto justify-content-center">
                    <Col xs={12} className="p-3">
                        <div className="signup__outer__box">
                            <div className="signup__inner__box">
                                <div className="mt-2 p-3">
                                    <div className="app-logo">{process.env.REACT_APP_NAME}</div>
                                </div>
                                <Container className="my-1 p-3">
                                    {props.children}
                                </Container>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FormLayout
