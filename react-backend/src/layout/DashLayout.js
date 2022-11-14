
import React, { Component } from 'react'
import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../css/main.css'
import auth from '../Components/Auth'
import { get_fname } from '../Components/TokenParser'

export default class DashLayout extends Component {
    constructor(props) {
        super(props);
        document.title = this.props.title;
        this.state = {
            fname: get_fname()
        }
    }
    Captilize = (name) => {
        if (typeof (name) !== 'string') return false
        const ucFirst = name.charAt(0).toUpperCase();
        const rest = name.slice(1)
        return ucFirst + rest;
    }
    render() {
        return (
            <div style={{ width: "100%" }}>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand className="mx-3" href="/dashboard">
                        {process.env.REACT_APP_NAME}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="p-2 justify-content-end" id="basic-navbar-nav">
                        <Nav className="mx-6">
                            <Nav.Link className="btn btn-outline-success mx-2" href="#home">Upgrade</Nav.Link>
                            <NavDropdown title={this.Captilize(this.state.fname)} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                {
                                    auth.hasAccess() ? (<NavDropdown.Item href="/teams">Team/Uses</NavDropdown.Item>) : ""
                                }

                                {
                                    auth.hasAccess() ? (<NavDropdown.Item href="/company">My Company</NavDropdown.Item>
                                    ) : ""
                                }
                                {
                                    auth.hasAccess() ? (<NavDropdown.Item href="">Plan/Billing</NavDropdown.Item>) : ""
                                }
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {
                                    auth.logout(() => { window.location.assign("/") })
                                }
                                }>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                {/* //! DIVIDER NEED TO BE CHANGE */}
                <Container fluid>
                    {this.props.children}
                </Container>

                <footer className="footer text-center text-muted" style={{ position: this.props.footer }}>
                    <Container fluid>
                        <Row className="p-2 mt-2">
                            <Col>
                                <p>copyright &copy; {process.env.REACT_APP_NAME} All right reserved.</p>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        )
    }
}
