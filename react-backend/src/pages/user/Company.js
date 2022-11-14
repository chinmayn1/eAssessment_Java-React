import React, { Component } from 'react'
import DashLayout from '../../layout/DashLayout'
import { Col, Row, Container, Button } from 'react-bootstrap'
import Api from '../../Components/Api'
import { Validator } from '../../Components/Validator'
export default class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: '',
            country: '',
            website: '',
            upload_file: '',
            error: null,
            message: null,
            tag: null,
        }
    }

    componentDidMount() {
        Api.get("/user/")
            .then((res) => {
                this.setState({
                    company_name: res.data.user.company_name,
                    country: res.data.user.country == null ? '' : res.data.user.country,
                    website: res.data.user.website == null ? '' : res.data.user.website,
                })
            })
            .catch((error) => { console.log(error.response); })
    }

    handleChange = e => {
        const target = e.target
        const name = target.name
        const value = target.value
        this.setState({ [name]: value, error: {} })
    }
    handleFileChange = e => {
        console.log(e.target.files)
        let file = e.target.files;
        if (file.length) {
            let size = file[0].size;
            let imgExt = file[0].type.slice(file[0].type.indexOf("/") + 1)
            console.log(size, imgExt);
            if (["jpeg", "png", "jpg"].includes(imgExt)) {
                if (size <= 5000000) {
                    let fileReader = new FileReader();
                    fileReader.readAsDataURL(file[0]);
                    console.log(fileReader)
                    fileReader.onload = () => {
                        this.setState({ previewLogo: fileReader.result });
                    }
                } else {
                    this.setState({ imgError: "The images size should be maximum 500Kb" })
                }
            } else {
                this.setState({ imgError: "The png, jpeg and jpg format are only supported" })
            }
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        const payload = {
            company_name: this.state.company_name,
            country: this.state.country,
            website: this.state.website,
        }
        this.setState({ error: Validator(payload) })
        if (Validator(payload).total_error === 0) {
            Api.put("/user/company/update/", payload)
                .then((res) => {
                    console.log(res.data)
                    this.setState({ message: res.data.message, tag: res.data.tag })
                })
                .catch(error => { console.log(error.response); })

        }
    }
    render() {
        return (
            <DashLayout title="Company">
                <Container className="p-3 mx-auto mt-5">
                    <header className="my-3">
                        <h3>My Company</h3>
                    </header>
                    <div className="my-4 p-5 bg-light box">
                        {this.state.message && <div className={"m-3 alert alert-" + this.state.tag}>{this.state.message}</div>}
                        <form onSubmit={this.handleSubmit}>
                            <div className="my-2">
                                <Row className="">
                                    <Col md={6}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type="text"
                                                    name="company_name"
                                                    id="company_name"
                                                    placeholder=" "
                                                    value={this.state.company_name}
                                                    onChange={this.handleChange}
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
                                                    name="country"
                                                    id="country"
                                                    placeholder=" "
                                                    value={this.state.country}
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="country" className="form__label">Country</label>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.country}</div>}
                                        </div>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type="text"
                                                    name="website"
                                                    id="web"
                                                    placeholder=" "
                                                    value={this.state.website}
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="web" className="form__label">Website</label>
                                            </div>
                                            {this.state.error && <div className="m-2 invalid-error">{this.state.error.website}</div>}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-4">
                                            <div className="form__group p-3">
                                                <input
                                                    className="form__input"
                                                    type="file"
                                                    name="file"
                                                    id="file"
                                                    placeholder=" "
                                                    onChange={e => this.handleFileChange(e)}
                                                    accept="image/*"
                                                />
                                                <label htmlFor="file" className="d-inline-block"></label>
                                                {this.state.imgError && <div className="m-2 invalid-error">{this.state.imgError}</div>}
                                            </div>
                                            {
                                                this.state.previewLogo && (
                                                    <div className="m-4 preview-container">
                                                        <img className="w-100" alt="Preview Logo" src={this.state.previewLogo} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col md="2">
                                        <Button type="submit" variant="success">Save Changes</Button>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                    </div>
                </Container>
            </DashLayout>
        )
    }
}
