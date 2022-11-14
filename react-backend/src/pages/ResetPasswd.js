import React, { Component } from 'react'
import Layout from '../layout/FormLayout'
import Button from 'react-bootstrap/Button'


export default class ResetPasswd extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        return (
            <Layout>
                <form action="" method="POST">
                    <div className="my-2">
                        <div className="p-2">
                            <h4>Reset your password</h4>
                        </div>
                        <div className="mb-4">
                            <div className="form__group p-3">
                                <input
                                    className="form__input"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder=" "
                                />
                                <label htmlFor="email" className="form__label">Email</label>
                            </div>
                        </div>
                        <Button type="submit" className="btn btn-success btn-color mt-4" block disabled>Send reset link</Button>
                        <div className="mt-2 p-3 text-center">
                            <a href="/">Go back to login</a>
                        </div>
                    </div>
                </form>
            </Layout>
        )
    }
}
