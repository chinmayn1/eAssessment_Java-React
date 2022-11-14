import React, { Component } from 'react'
import { Col, Row, Container, Button, Modal } from 'react-bootstrap'
import DashLayout from '../../layout/DashLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye, faKey, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import { get_user_id, get_user_role } from '../../Components/TokenParser'
import Api from '../../Components/Api'
import { Validator } from '../../Components/Validator'

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPasswordModal: false,
			showEmailModal: false,
			first_name: '',
			last_name: '',
			mobile: '',
			new_email: '',
			current_password: '',
			old_password: '',
			new_password: '',
			confirm_password: '',
			oldPasswdVisibility: false,
			newPasswdVisibility: false,
			cnewPasswdVisibility: false,
			oldPasswdInput: "password",
			newPasswdInput: "password",
			cnewPasswdInput: "password",
			emailIcon: faEnvelope,
		}
	}

	componentDidMount() {

		Api.get((get_user_role() === "Owner" ? "/user/" : "/team/" + get_user_id()))
			.then((res) => {
				console.log(res.data)
				this.setState({
					first_name: res.data.user.fname,
					last_name: res.data.user.lname,
					mobile: (res.data.user.mobile !== "None") ? res.data.user.mobile : ''
				})
			})
			.catch((error) => { console.log(error.response); })
	}
	handlePasswdClose = () => {
		this.setState({ showPasswordModal: false })
	}
	handlePasswdShow = () => {
		this.setState({ showPasswordModal: true });
	}
	handleEmailClose = () => {
		this.setState({ showEmailModal: false })
	}
	handleEmailShow = () => {
		this.setState({ showEmailModal: true });
	}
	handleChange = e => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		this.setState({ [name]: value, error: {} });
		if (name === 'mobile' && !/^\d+$/.test(value)) {
			const error = {};
			error.mobile = 'Number must be valid';
			this.setState({ error: error })
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		const payload = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			mobile: this.state.mobile
		}
		Api.put("/user/profile/update/", payload)
			.then((res) => {
				if (!res.data.status) {
					console.log(res.data.status);
				} else {
					console.log(res.data)
					this.setState({ profileMessage: res.data.message, tag: res.data.tag })
				}

			})
			.catch((err) => { console.log(err); })
	}
	handleEmailSubmit = e => {
		e.preventDefault();
		const payload = {
			email: this.state.new_email,
			password: this.state.current_password
		}
		this.setState({ error: Validator(payload) })
		if (Validator(payload).total_error === 0) {
			Api.put("/user/profile/update/", payload)
				.then((res) => {
					if (!res.data.status) {
						console.log(res.data);
						this.setState({ emailMessage: res.data.message, tag: res.data.tag })
					} else {
						console.log(res.data)
						this.setState({ emailMessage: res.data.message, tag: res.data.tag })
					}

				})
				.catch((err) => { console.log(err); })
		}
	}
	handlePasswordSubmit = e => {
		e.preventDefault();
		const payload = {
			old_password: this.state.old_password,
			new_password: this.state.new_password,
			confirm_password: this.state.confirm_password
		}
		this.setState({ error: Validator(payload) });
		if (Validator(payload).total_error === 0) {
			Api.put("/user/profile/update/", payload)
				.then((res) => {
					if (!res.data.status) {
						console.log(res.data);
					} else {
						console.log(res.data)
						this.setState({ passwordMessage: res.data.message, tag: res.data.tag })
					}
				})
				.catch((error) => { this.setState({ passwordMessage: error.response.data.message, tag: error.response.data.tag }) })
		}
	}

	render() {
		return (
			<DashLayout title="Profile">
				<Container className="p-3 mx-auto mt-5">
					<header className="my-3">
						<h3>My Profile</h3>
					</header>
					<div className="my-4 p-5 bg-light box">
						{this.state.profileMessage && <div className={"m-3 alert alert-" + this.state.tag}>{this.state.profileMessage}</div>}
						<form onSubmit={this.handleSubmit}>
							<div className="my-2">
								<Row>
									<Col md={6}>
										<div className="mb-4">
											<div className="form__group p-3">
												<input
													className="form__input"
													type="text"
													name="first_name"
													id="first_name"
													placeholder=" "
													value={this.state.first_name}
													onChange={this.handleChange}
												/>
												<label htmlFor="first_name" className="form__label">First Name</label>
											</div>
										</div>
									</Col>
									<Col md={6}>
										<div className="mb-4">
											<div className="form__group p-3">
												<input
													className="form__input"
													type="text"
													name="last_name"
													id="last_name"
													placeholder=" "
													value={this.state.last_name}
													onChange={this.handleChange}
												/>
												<label htmlFor="last_name" className="form__label">Last Name</label>
											</div>
										</div>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<div className="mb-4">
											<div className="form__group p-3">
												<input
													className="form__input"
													type="text"
													name="mobile"
													id="mobile"
													placeholder=" "
													value={this.state.mobile}
													onChange={this.handleChange}
												/>
												<label htmlFor="mobile" className="form__label">Number</label>
											</div>
											{this.state.error && <div className="m-2 invalid-error">{this.state.error.mobile}</div>}
										</div>
									</Col>
								</Row>
								<Row className="my-3 d-flex justify-content-between">
									<Col md="8" xs="12">
										<Button onClick={this.handlePasswdShow} variant="secondary" className="mr-3 my-2">
											<FontAwesomeIcon icon={faKey} className="icon-dark mx-1" />
											<span>Change Password</span>
										</Button>
										<Button variant="secondary" onClick={this.handleEmailShow} onMouseLeave={() => this.setState({ emailIcon: faEnvelope })} onMouseEnter={() => this.setState({ emailIcon: faEnvelopeOpen })}>
											<FontAwesomeIcon icon={this.state.emailIcon} className="icon-dark mx-1" />
											<span>Change Email</span>
										</Button>
									</Col>
									<Col md="2" className="my-2">
										<Button type="submit" variant="success">Save Changes</Button>
									</Col>
								</Row>
							</div>
						</form>
					</div>
				</Container>
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
													type={this.state.oldPasswdInput}
													name="old_password"
													id="old_password"
													placeholder=" "
													onChange={this.handleChange}
												/>
												<FontAwesomeIcon className="show_hide_password_icon" icon={this.state.oldPasswdVisibility ? faEye : faEyeSlash} onClick={() => { this.state.oldPasswdVisibility ? this.setState({ oldPasswdVisibility: false, oldPasswdInput: "password" }) : this.setState({ oldPasswdVisibility: true, oldPasswdInput: "text" }) }} />
												<label htmlFor="old_password" className="form__label">Old Password</label>
											</div>
											{this.state.error && <div className="m-2 invalid-error">{this.state.error.old_password}</div>}
										</div>
									</Col>
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
