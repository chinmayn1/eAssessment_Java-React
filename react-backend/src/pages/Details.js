import React, { Component } from 'react'
import Layout from '../layout/FormLayout'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Validator } from '../Components/Validator';
export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            company_name: '',
            job_title: '',
            hires: '',
            error: null,
            status: false,
            endpoint: '/user/details/'
        }
    }
    handleChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value, error: {} });
    }
    handleFocus = e => {
        this.setState({ error: Validator(this.state) })
    }

    handleSubmit = e => {
        e.preventDefault();
        const payload = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            company_name: this.state.company_name,
            job_title: this.state.job_title,
            hires: this.state.hires
        }
        this.setState({ error: Validator(payload) })
        if (Validator(payload).total_error === 0) {
            //Submit
            let token = this.props.location.search
            axios({
                method: 'PUT',
                url: process.env.REACT_APP_BACKEND_URL + this.state.endpoint,
                data: payload,
                responseType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + (token.startsWith("?token=") ? token.slice(token.indexOf("=") + 1) : '')
                }
            })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status) {
                        console.log(res.data.status);
                        this.setState({ status: true });
                    }
                })
                .catch((err) => { console.log(err); })
        }
    }
    validator = (data) => {
        console.log(data)
        const error = {}
        if (!data.first_name) {
            error.first_name = 'This is required';
        }
        if (!data.last_name) {
            error.last_name = "This is required";
        }
        if (!data.company_name) {
            error.company_name = "This is required";
        }
        if (!data.job_title) {
            error.job_title = "This is required";
        }
        if (!data.hires) {
            error.hires = "This is required";
        }
        error.total_error = Object.keys(error).length
        return error
    }
    render() {
        if (this.state.status) {
            return <Redirect push to={{ pathname: "/" }} />
        }
        return (
            <Layout>
                <form onSubmit={this.handleSubmit}>
                    <div className="my-2">
                        <div className="p-2">
                            <h4>Tell us a bit about you</h4>
                        </div>
                        <div className="mb-4">
                            <div className="form__group p-3">
                                <input
                                    className="form__input"
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    placeholder=" "
                                    onFocus={this.handleFocus}
                                    onChange={this.handleChange}
                                    value={this.state.first_name}
                                />
                                <label htmlFor="first_name" className="form__label">First Name</label>
                            </div>
                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.first_name}</div>}
                        </div>
                        <div className="mb-4">
                            <div className="form__group p-3">
                                <input
                                    className="form__input"
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    placeholder=" "
                                    onFocus={this.handleFocus}
                                    onChange={this.handleChange}
                                    value={this.state.last_name}
                                />
                                <label htmlFor="last_name" className="form__label">Last Name</label>
                            </div>
                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.last_name}</div>}
                        </div>
                        <div className="mb-4">
                            <div className="form__group p-3">
                                <input
                                    className="form__input"
                                    type="text"
                                    name="company_name"
                                    id="company_name"
                                    placeholder=" "
                                    onFocus={this.handleFocus}
                                    onChange={this.handleChange}
                                    value={this.state.company_name}
                                />
                                <label htmlFor="company_name" className="form__label">Company Name</label>
                            </div>
                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.company_name}</div>}
                        </div>
                        <div className="mb-4">
                            <div className="form__group p-3">
                                <input
                                    className="form__input"
                                    type="text"
                                    name="job_title"
                                    id="job_title"
                                    placeholder=" "
                                    onFocus={this.handleFocus}
                                    onChange={this.handleChange}
                                    value={this.state.job_title}
                                />
                                <label htmlFor="job_title" className="form__label">Job Title</label>
                            </div>
                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.job_title}</div>}
                        </div>
                        <div className="mb-4">
                            <div className="form__group p-3">
                                <select className="form__input px-3 py-0" name="hires" id="hires" onFocus={this.handleFocus} onChange={this.handleChange} value={this.state.hires}>
                                    <option value="">Number of hires per year</option>
                                    <option value="1-5">1-5</option>
                                    <option value="1-20">1-20</option>
                                    <option value="1-50">1-50</option>
                                    <option value="above 50">Above 50</option>
                                </select>
                            </div>
                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.hires}</div>}
                        </div>
                        <Button type="submit" className="btn btn-success btn-color mt-4" block>Finish Setup</Button>
                    </div>
                </form>
            </Layout>
        )
    }
}
