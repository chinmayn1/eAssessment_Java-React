import React, { Component } from 'react'
import Layout from '../layout/FormLayout'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { get_decoded_token } from '../Components/TokenParser'
import { Validator } from '../Components/Validator'
export default class Passwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_password: '',
            confirm_password: '',
            error: null,
            atleast_eight: false,
            status: false,
            passwordVisibility: false,
            cpasswordVisibility: false,
            passwordType: "password",
            cpasswordType: "password",
            token: this.props.location.search,
            tokenData: get_decoded_token(this.props.location.search)
        }
    }

    componentDidMount() {
        this.setState({ endpoint: (this.state.tokenData.sub.userFrom === "team" ? "/team/set-password" : "/user/details/") })
    }
    handleChange = e => {
        const target = e.target
        const name = target.name
        const value = target.value;
        this.setState({ [name]: value })
        this.setState({ error: null })
        if (name === 'current_password') {
            const labels = ['', 'Too Weak!🥲', 'Average😩', 'Strong💪']
            let lowUpp = document.querySelector('.pass-validator.lower-upper')
            let special_char = document.querySelector('.pass-validator.atleast-special');
            let eight_plus = document.querySelector('.pass-validator.character');
            let atleast_number = document.querySelector('.pass-validator.atleast-number');
            let strength = document.getElementById('passwd-strength');
            let status = document.getElementById('status');
            if (/[a-zA-Z]/g.test(value)) {
                lowUpp.classList.replace('invalid', 'valid')
            } else {
                lowUpp.classList.replace('valid', 'invalid')
            }
            if (/['!@#$%^&*()']/g.test(value)) {
                special_char.classList.replace('invalid', 'valid')
            } else {
                special_char.classList.replace('valid', 'invalid')
            }
            if (/[0-9]/g.test(value)) {
                atleast_number.classList.replace('invalid', 'valid')
            } else {
                atleast_number.classList.replace('valid', 'invalid')
            }
            if (value.length >= 8) {
                eight_plus.classList.replace('invalid', 'valid')
                this.setState({ atleast_eight: true })
            } else {
                eight_plus.classList.replace('valid', 'invalid')
                this.setState({ atleast_eight: false })
            }
            //? Passwd Strength Meter
            if (value.length > 0 && value.length <= 4) {
                strength.style.cssText = "width:30%;background-color:#ff0069";
                status.innerText = labels[1]
            } else if (value.length >= 5 && value.length <= 8) {
                strength.style.cssText = "width:70%;background-color:#ff6910";
                status.innerText = labels[2]
            } else if (value.length > 8) {
                strength.style.cssText = "width:90%;background-color:#39d600";
                status.innerText = labels[3]
            } else if (value.length >= 14 && /['!@#$%^&*()_=']/g.test(value)) {
                strength.style.cssText = "width:100%;background-color:#39d600";
                status.innerText = labels[3]
            } else {
                strength.style.cssText = "width:0%;background-color:#ffffff";
                status.innerText = labels[0]
            }
        }
    }

    handleFocus = e => {
        if (e.target.name === "current_password") {
            document.querySelector('.custom-toast').classList.add('show')
        }
        this.setState({ error: Validator(this.state) })
    }
    handleBlur = () => {
        document.querySelector('.custom-toast').classList.remove('show')
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ error: Validator(this.state) })
        if (Validator(this.state).total_error === 0) {
            const payload = {
                password: this.state.current_password
            }
            axios({
                method: 'PUT',
                url: process.env.REACT_APP_BACKEND_URL + this.state.endpoint,
                data: payload,
                responseType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + (this.state.token.startsWith("?token=") ? this.state.token.slice(this.state.token.indexOf("=") + 1) : '')
                }
            })
                .then((res) => {
                    console.log(res.data);
                    if (!res.data.status) {
                        console.log(res.data.status);
                        this.setState({ message: res.data.message })
                    } else {
                        this.setState({ status: true });
                    }

                })
                .catch((err) => { console.log(err); })
        }
    }
    handleVisibility = (visiblityState, inputType) => {
        console.log(visiblityState)
        if (visiblityState) {
            this.setState({ visiblityState: false });
        } else {
            this.setState({ visiblityState: true })
        }
    }

    render() {
        if (this.state.status) {
            if (this.state.tokenData['sub']['userFrom'] === "team") {
                return <Redirect push to="/" />
            }
            else {
                return <Redirect push to={{ pathname: "/details", search: this.state.token }
                } />
            }
        }
        return (
            <Layout>
                <form onSubmit={this.handleSubmit}>
                    <div className="my-2">
                        <div className="p-2">
                            <h4>Set/Reset your password</h4>
                        </div>

                        {
                            this.state.tokenData.sub.email ? (
                                <div className="my-2">
                                    <div className="form__group p-3">
                                        <input
                                            className="form__input"
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder=" "
                                            readOnly
                                            value={this.state.tokenData.sub.mail}
                                        />
                                        <label htmlFor="current_password" className="form__label">Email</label>
                                    </div></div>) : ""
                        }
                        <div className="my-4">
                            <div className="form__group p-3">
                                <input
                                    className="form__input"
                                    type={this.state.passwordType}
                                    name="current_password"
                                    id="current_password"
                                    placeholder=" "
                                    onFocus={this.handleFocus}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    value={this.state.current_password}
                                />
                                <FontAwesomeIcon className="show_hide_password_icon" icon={this.state.passwordVisibility ? faEye : faEyeSlash} onClick={() => { this.state.passwordVisibility ? this.setState({ passwordVisibility: false, passwordType: "password" }) : this.setState({ passwordVisibility: true, passwordType: "text" }) }} />
                                <label htmlFor="current_password" className="form__label">Password</label>
                            </div>
                            <div className="custom-toast fade mt-3 mx-0">
                                <div className="custom-toast-header">
                                    Your passsword must have:
                                </div>
                                <div className="custom-toast-body">
                                    <span className="pass-validator character invalid">
                                        <i className="fas fa-check-circle pass-validator-icon"></i>
                                        <span className="pass-validator-text">8 or more characters</span>
                                    </span>
                                    <span className="pass-validator lower-upper invalid">
                                        <i className="fas fa-check-circle pass-validator-icon "></i>
                                        <span className="pass-validator-text">upper or lowercase letters</span>
                                    </span>
                                    <span className="pass-validator atleast-number invalid">
                                        <i className="fas fa-check-circle pass-validator-icon atleast-number"></i>
                                        <span className="pass-validator-text ">at least one number</span>
                                    </span>
                                    <span className="pass-validator atleast-special invalid">
                                        <i className="fas fa-check-circle pass-validator-icon atleast-number"></i>
                                        <span className="pass-validator-text ">at least one special character</span>
                                    </span>
                                </div>
                                <div className="custom-progress-container">
                                    <div className="custom-progress-header">Password Strength: <span id="status"></span></div>
                                    <div className="custom-progress">
                                        <div className="custom-progress-bar" id="passwd-strength"></div>
                                    </div>
                                </div>
                            </div>
                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.current_password}</div>}
                        </div>

                        <div className="mt-3">
                            <div className="form__group p-3">
                                <input
                                    className="form__input"
                                    type={this.state.cpasswordType}
                                    name="confirm_password"
                                    id="confirm_password"
                                    placeholder=" "
                                    onFocus={this.handleFocus}
                                    onChange={this.handleChange}
                                    value={this.state.confirm_password}
                                />
                                <FontAwesomeIcon className="show_hide_password_icon" icon={this.state.cpasswordVisibility ? faEye : faEyeSlash} onClick={() => { this.state.cpasswordVisibility ? this.setState({ cpasswordVisibility: false, cpasswordType: "password" }) : this.setState({ cpasswordVisibility: true, cpasswordType: "text" }) }} />

                                <label htmlFor="confirm_password" className="form__label">Confirm Password</label>
                            </div>
                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.confirm_password}</div>}
                        </div>
                        <Button type="submit" className="btn btn-success btn-color mt-4" block >Set Password</Button>
                        <div className="mt-2 p-3 text-center">
                            <a href="/">Go back to login</a>
                        </div>
                    </div>
                </form>
            </Layout>
        )
    }
}
