import React, { Component } from 'react'
import Layout from '../layout/FormLayout'
import auth from '../Components/Auth'
import { StyledButton, RequiredStar } from '../Components/StyledComponents'
import { Validator } from '../Components/Validator'
import Api from '../Components/Api'
export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
            endpoint: '',
            status: false,
            message: '',
            logged: false,
            isLoading: false
        }
        document.title = 'Sign In';

    }
    handleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value, error: {} });
    }
    handleFocus = () => {
        this.setState({ error: Validator(this.state) })
    }

    handleSubmit = e => {
        e.preventDefault();
        const payload = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({ error: Validator(payload) })
        if (Validator(payload).total_error === 0) {
            this.setState({ isLoading: true })
            Api.post(this.state.endpoint, payload)
                .then((res) => {
                    console.log(res)
                    if (res.data.status) {
                        this.setState({ status: true })
                        auth.login(res.data.user, () => { this.props.history.push('/dashboard') })
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                    this.setState({ message: error.response.data.message, isLoading: false })
                })

        }
    }
    render() {
        return (
            <Layout>
                {this.state.message && <div className="alert alert-danger">{this.state.message}</div>}
                <form onSubmit={this.handleSubmit} >
                    <div className="my-2">
                        <div className="mb-4">
                            <div className="form__group p-3">
                                <input
                                    className="form__input"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder=" "
                                    onFocus={this.handleFocus}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="email" className="form__label">Email<RequiredStar /></label>
                            </div>
                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.email}</div>}
                        </div>
                        <div className="mb-4">
                            <div className="form__group p-3">
                                <input
                                    className="form__input"
                                    type="password"
                                    name="password"
                                    id="current_password"
                                    placeholder=" "
                                    onFocus={this.handleFocus}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="current_password" className="form__label">Password<RequiredStar /></label>
                            </div>
                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.password}</div>}
                        </div>
                        <div className="p-1 d-flex justify-content-between checkbox__container">
                            <div className="checkbox__group">
                                <label className="d-flex">
                                    <input type="checkbox" />
                                    <span className="checkbox-wrapper">
                                        <span className="checkbox"></span>
                                    </span>
                                    Keep me logged in ?
                                </label>
                            </div>
                            <div>
                                <a href="/reset-password">Set or reset password</a>
                            </div>
                        </div>
                        <StyledButton type="submit" block isLoading={this.state.isLoading} >{this.state.isLoading ? "Verifying" : "Login"}</StyledButton>
                        <div className="mt-2 p-3 text-center">
                            <span>Don't have an account? <a href="/signup">Create Account</a></span>
                        </div>
                    </div>
                </form>
            </Layout>
        )
    }
}
