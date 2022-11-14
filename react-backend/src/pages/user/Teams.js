import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Modal, Badge } from 'react-bootstrap';
import '../../css/main.css'
import DashLayout from '../../layout/DashLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUserEdit, faUserAltSlash, faPlusCircle, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { get_user_id, get_user_role } from '../../Components/TokenParser'
import Api from '../../Components/Api';
import { Validator } from '../../Components/Validator';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddUserModal: false,
            showPasswordModal: false,
            showEmailModal: false,
            members: null,
            fname: '',
            lname: '',
            email: '',
            new_password: '',
            confirm_password: '',
            role: '',
            id: null,
            setSpin: false,
            newPasswdVisibility: false,
            cnewPasswdVisibility: false,
            newPasswdInput: "password",
            cnewPasswdInput: "password",
        }
    }

    componentDidMount() {
        Api.get("/team/")
            .then((res) => {
                this.setState({ members: res.data.result })
                //console.log(res.data.result)
            })
            .catch((error) => { console.log(error); })
    }

    RemoveMember = (id) => {
        let result = [];
        this.state.members.map((i) => {
            if (i.role === "Owner") {
                result.push(i);
            } else {
                if (i.id !== id) result.push(i)
            }
            return result;
        })
    }

    handlePasswdClose = () => {
        this.setState({ showPasswordModal: false, id: '' })
    }
    handlePasswdShow = (id) => {
        this.setState({ showPasswordModal: true, id: id });
    }
    handleEmailClose = () => {
        this.setState({ showEmailModal: false })
    }
    handleEmailShow = () => {
        this.setState({ showEmailModal: true });
    }

    TimeOut = () => {
        setTimeout(() => { window.location.reload() }, 6000)
    }

    handleModal = () => {
        if (this.state.showAddUserModal) {
            this.setState({ showAddUserModal: false });
        } else {
            this.setState({ showAddUserModal: true })
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value, error: {} })
        if (e.target.name === 'mobile' && !/^\d+$/.test(e.target.value)) {
            const error = {};
            error.mobile = 'Number must be valid';
            this.setState({ error: error })
        }
    }

    handleAddUserSubmit = e => {
        e.preventDefault();
        const payload = {
            email: this.state.email,
            fname: this.state.fname,
            lname: this.state.lname,
            role: this.state.role,
            mobile: this.state.mobile
        }
        this.setState({ error: Validator(payload) })
        if (Validator(payload).total_error === 0) {
            this.state.members.push(payload)
            Api.post("/team/member/create", payload)
                .then((res) => {
                    this.setState({ successMessage: res.data.message, tag: res.data.tag, showAddUserModal: false })
                    this.TimeOut()
                })
                .catch((error) => {
                    console.log(error.response); if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, tag: error.response.data.tag, showAddUserModal: false })
                    }
                })
        }
    }
    handlePasswordSubmit = e => {
        e.preventDefault();
        const payload = {
            new_password: this.state.new_password,
            confirm_password: this.state.confirm_password,
            id: this.state.id
        }
        this.setState({ error: Validator(payload) });
        if (Validator(payload).total_error === 0) {
            Api.put("/team/member/update/", payload)
                .then((res) => {
                    this.setState({ successMessage: res.data.message, tag: res.data.tag, showAddUserModal: false })
                    this.TimeOut()
                })
                .catch((error) => {
                    console.log(error.response); if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, tag: error.response.data.tag })
                    }
                });
        }
    }

    handleDelete = (id = undefined) => {
        if (id) {
            this.setState({ members: this.RemoveMember(id) })
            Api.delete("/team/member/delete/" + id)
                .then((res) => {
                    console.log(res.data)
                    this.setState({ successMessage: res.data.data.message, tag: res.data.data.tag });
                    this.TimeOut();
                })
                .catch((error) => { console.log(error); this.setState({ message: error.response.data.message, tag: error.response.data.tag }) })
        }
    }
    render() {
        return (
            <DashLayout title="Team">
                <Container className="p-3 mx-auto mt-5">
                    <header className="my-3">
                        <Row className="justify-content-between">
                            <h3>Team/Users</h3>
                            <Button variant="success" onClick={this.handleModal} onMouseEnter={() => { this.setState({ setSpin: true }) }} onMouseLeave={() => this.setState({ setSpin: false })}><FontAwesomeIcon icon={faPlusCircle} className="mx-2" spin={this.state.setSpin} /> Add User</Button>
                        </Row>
                    </header>
                    <div className="my-4 p-5 bg-light box">
                        {this.state.successMessage && <div className={"alert alert-" + this.state.tag + " mx-auto"}>{this.state.successMessage}</div>}
                        {this.state.message && <div className={"alert alert-" + this.state.tag + " mx-auto"}>{this.state.message}</div>}
                        <Col xs={12} className="mx-md-1 my-1 p-xs-0">
                            <Container fluid className="p-xs-0">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.members &&
                                            this.state.members.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{item.fname}</td>
                                                    <td>{item.email}</td>
                                                    <td>
                                                        <Badge pill variant="info">{item.role}</Badge>
                                                    </td>
                                                    <td>
                                                        {
                                                            item.role === 'Owner' ? '' : ((get_user_role() === "Admin" && item.role === "Admin" && item.id !== get_user_id()) ? "" : ((<div className="d-flex justify-content-around">
                                                                <button onClick={() => {
                                                                    (item.id === get_user_id() && get_user_role() !== "Owner") ? this.props.history.push("/profile") : this.handleEmailShow()
                                                                }} className="actions-btn">
                                                                    <FontAwesomeIcon icon={faUserEdit} />
                                                                </button>
                                                                <button onClick={() => {
                                                                    (item.id === get_user_id() && get_user_role() !== "Owner") ? this.props.history.push("/profile") : this.handlePasswdShow(item.id)
                                                                }} className="actions-btn">
                                                                    <FontAwesomeIcon icon={faKey} />
                                                                </button>
                                                                <button className="actions-btn">
                                                                    <FontAwesomeIcon icon={faUserAltSlash} onClick={() => this.handleDelete(item.id)} />
                                                                </button>
                                                            </div>)))
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Container>
                        </Col>
                    </div>
                </Container>
                {/* Add Member Modal */}
                <Modal centered animation={false} show={this.state.showAddUserModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.Errormessage && <div className={"alert alert-" + this.state.tag + " mx-auto"}>{this.state.Errormessage}</div>}
                        <form onSubmit={this.handleAddUserSubmit} >
                            <div className="my-2">
                                <Row>
                                    <Col xs={12}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type="text"
                                                    name="fname"
                                                    id="user_fname"
                                                    placeholder=" "
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="user_fname" className="form__label">First Name</label>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.fname}</div>}
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type="text"
                                                    name="lname"
                                                    id="user_lname"
                                                    placeholder=" "
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="user_lname" className="form__label">Last Name</label>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.lname}</div>}
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type="email"
                                                    name="email"
                                                    id="user_email"
                                                    placeholder=" "
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="user_email" className="form__label">Email</label>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.email}</div>}
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type="text"
                                                    name="mobile"
                                                    id="user_mobile"
                                                    placeholder=" "
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="user_mobile" className="form__label">Mobile</label>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.mobile}</div>}
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <select className="form__input" name="role" id="role" onChange={this.handleChange}>
                                                    <option value="">Pick one role</option>
                                                    {
                                                        this.state.get_currentUser_role === "Admin" ? "" : (<option value="Admin">Admin</option>)
                                                    }
                                                    <option value="HR Manager">HR Manager</option>
                                                    <option value="Recruiter">Recruiter</option>
                                                </select>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.role}</div>}
                                        </div>
                                    </Col>
                                    <Col className="justify-content-end d-flex">
                                        <Button variant="secondary" onClick={this.handleModal}>Cancel</Button>
                                        <Button type="submit" variant="success" className="mx-2">Add</Button>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                {/* Password Modal */}
                <Modal centered animation={false} show={this.state.showPasswordModal} onHide={this.handlePasswdClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.passwordMessage && <div className={"m-3 alert alert-" + this.state.tag}>{this.state.passwordMessage}</div>}
                        <form onSubmit={this.handlePasswordSubmit}>
                            <div className="my-2">
                                <Row>
                                    <Col xs={12}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type={this.state.newPasswdInput}
                                                    name="new_password"
                                                    id="new_password"
                                                    placeholder=" "
                                                    onChange={this.handleChange}
                                                />
                                                <FontAwesomeIcon className="show_hide_password_icon" icon={this.state.newPasswdVisibility ? faEye : faEyeSlash} onClick={() => { this.state.newPasswdVisibility ? this.setState({ newPasswdVisibility: false, newPasswdInput: "password" }) : this.setState({ newPasswdVisibility: true, newPasswdInput: "text" }) }} />
                                                <label htmlFor="new_password" className="form__label">New Password</label>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.new_password}</div>}
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type={this.state.cnewPasswdInput}
                                                    name="confirm_password"
                                                    id="confirm_password"
                                                    placeholder=" "
                                                    onChange={this.handleChange}
                                                />
                                                <FontAwesomeIcon className="show_hide_password_icon" icon={this.state.cnewPasswdVisibility ? faEye : faEyeSlash} onClick={() => { this.state.cnewPasswdVisibility ? this.setState({ cnewPasswdVisibility: false, cnewPasswdInput: "password" }) : this.setState({ cnewPasswdVisibility: true, cnewPasswdInput: "text" }) }} />
                                                <label htmlFor="confirm_password" className="form__label">Confirm Password</label>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.confirm_password}</div>}
                                        </div>
                                    </Col>
                                    <Col className="justify-content-end d-flex">
                                        <Button variant="secondary" onClick={this.handlePasswdClose}>Cancel</Button>
                                        <Button type="submit" variant="success" className="mx-2">Change</Button>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                {/* Email Modal */}
                <Modal centered animation={false} show={this.state.showEmailModal} onHide={this.handleEmailClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.emailMessage && <div className={"m-3 alert alert-" + this.state.tag}>{this.state.emailMessage}</div>}
                        <form onSubmit={this.handleEmailSubmit}>
                            <div className="my-2">
                                <Row>
                                    <Col xs={12}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type="email"
                                                    name="new_email"
                                                    id="new_email"
                                                    placeholder=" "
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="new_email" className="form__label">New Email</label>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.email}</div>}
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type="password"
                                                    name="current_password"
                                                    id="current_passorwd"
                                                    placeholder=" "
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="current_password" className="form__label">Current Password</label>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.password}</div>}
                                        </div>
                                    </Col>
                                    <Col className="justify-content-end d-flex">
                                        <Button variant="secondary" onClick={this.handleEmailClose}>Cancel</Button>
                                        <Button type="submit" variant="success" className="mx-2">Change</Button>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </DashLayout>
        )
    }
}
