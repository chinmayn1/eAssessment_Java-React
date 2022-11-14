import React, { Component } from 'react'
import Layout from '../layout/FormLayout'
import { StyledButton, RequiredStar } from '../Components/StyledComponents'
import Api from '../Components/Api';
import { Validator } from '../Components/Validator';

export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            terms: false,
            error: null,
            endpoint: '/user/signup',
            status: false,
            message: '',
            isLoading: false
        }
        document.title = 'Sign Up';
    }
    handleChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value, error: {} });
    }
    handleFocus = () => {
        this.setState({ error: Validator(this.state) })
    }

    handleSubmit = e => {
        e.preventDefault();
        const payload = {
            email: this.state.email,
            terms: this.state.terms
        }
        this.setState({ error: Validator(payload) })
        if (Validator(payload).total_error === 0) {
            this.setState({ isLoading: true })
            Api.post(this.state.endpoint, payload)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status) {
                        this.setState({ status: true });
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                    this.setState({ message: error.response.data.message, isLoading: false })
                })
        }
    }
    render() {
        if (this.state.status) {
            return (
                <Layout>
                    <div>
                        <p>Thank you for registration with us</p>
                        <p>we have send you an email at <span className="font-weight-bold">{this.state.email}</span> to active your account.</p>
                    </div>
                </Layout>
            )
        }
        return (
            <Layout>
                {this.state.message && <div className="alert alert-danger">{this.state.message}</div>}
                <div className="text p-1">Get started with your free plan.</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-4 mt-1">
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
                    <div className="my-1">
                        <div className="p-1 d-flex flex-column checkbox__container">
                            <div className="checkbox__group">
                                <label className="d-flex">
                                    <div>
                                        <input type="checkbox" name="terms" onChange={this.handleChange} defaultChecked={this.state.terms} />
                                        <span className="checkbox-wrapper">
                                            <span className="checkbox"></span>
                                        </span>
                                    </div>
                                    <div>
                                        I have read and accept the <a href="#">terms of use</a>
                                    </div>
                                </label>
                                {this.state.error && <div className="m-2 invalid-error">{this.state.error.terms}</div>}
                            </div>
                            <div className="checkbox__group">
                                <label className="d-flex">
                                    <div>
                                        <input type="checkbox" name="service_checkbox" />
                                        <span className="checkbox-wrapper">
                                            <span className="checkbox"></span>
                                        </span>
                                    </div>
                                    <div>Send me occasional emails about services</div>
                                </label>
                            </div>
                        </div>
                        <StyledButton type="submit" isLoading={this.state.isLoading} block>{this.state.isLoading ? "Verifying" : "Create my free account"}</StyledButton>
                        <div className="mt-2 p-3 text-center">
                            <span>Already have a account? <a href="/">Log in</a></span>
                        </div>
                    </div>
                </form>
            </Layout>
        )
    }
}
