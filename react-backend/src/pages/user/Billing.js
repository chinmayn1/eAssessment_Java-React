import React, { Component } from 'react'
import DashLayout from '../../layout/DashLayout'
import { Col, Row, Container, Button } from 'react-bootstrap'

export default class Billing extends Component {
    render() {
        return (
            <DashLayout title="Billing">
                <Container className="p-3 mx-auto mt-5">
                    <header className="my-3">
                        <h3>Billing</h3>
                    </header>
                    <div className="my-4 p-5 bg-light box">
                        <Row className="justify-content-center">
                            <Col xs={12}>
                                <div className="mb-4">
                                    <h4>Plan</h4>
                                    <div className="form__group p-3 d-flex justify-content-around">
                                        <input
                                            className="form__input bg-grey w-50"
                                            readOnly
                                            value="FREE TRAIL"
                                            placeholder=" "
                                        />
                                        <div className="ml-6"><p>Candidate 3</p></div>
                                    </div>
                                    <div className="my-3 p-2 d-inline-block">
                                        <span className="mr-3"> Your current plan will expire on Aug 31, 2021.</span>
                                        <Button variant="success">Upgrade</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col>

                            </Col>
                        </Row>
                    </div>
                </Container>
            </DashLayout>
        )
    }
}
