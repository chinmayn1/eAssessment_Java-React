import React, { Component } from "react";
import DashLayout from "../../layout/DashLayout";
import { Col, Container, Row } from "react-bootstrap";
import Stepper from '../../Components/Stepper'
import { get_assessment_id } from "../../Components/TokenParser"
import Api from "../../Components/Api";
import { Validator } from "../../Components/Validator";

class NewAssessment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			assessment_name: "",
			job_role: "",
			assessment_id: get_assessment_id()
		}
	}

	componentDidMount() {
		if (this.state.assessment_id) {
			Api.get("/new-assessment/" + this.state.assessment_id)
				.then((res) => {
					if (res.status) {
						console.log(res.data)
						this.setState({ assessment_name: res.data.assessments.assessment_name, job_role: res.data.assessments.job_role })
					}
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value, error: {} })
		//this.setState({ error: this.validator(this.state) })
	}
	handleFocus = () => {
		this.setState({ error: this.validate(this.state) })
	}
	validate = (data) => {
		const error = Validator(data)
		if (error.total_error !== 0)
			this.setState({ error: error });
		return error
	}
	render() {
		return (
			<DashLayout title="New Assessment" >
				<Container className="p-3 mx-auto mt-5">
					<div className="my-4 p-3 bg-light box">
						{this.state.profileMessage && <div className={"m-3 alert alert-" + this.state.tag}>{this.state.profileMessage}</div>}
						<div className="my-2 " >
							<Stepper currentstep={1} history={this.props} nextstep={"/add-questions"} payload={this.state} validator={this.validate} />
							<form onSubmit={this.handleSubmit}>
								<Container className="p-3 my-2">
									<Row className="justify-content-center">
										<Col md="8">
											<div className="mb-4">
												<div className="form__group p-3">
													<input
														className="form__input"
														type="text"
														name="assessment_name"
														id="assessment_name"
														placeholder=" "
														onChange={this.handleChange}
														onFocus={this.handleFocus}
														value={this.state.assessment_name}
													/>
													<label htmlFor="assessment_name" className="form__label">Name Your Assessment</label>
												</div>
												{this.state.error && <div className="m-2 invalid-error">{this.state.error.assessment_name}</div>}
											</div>
										</Col>

										<Col md="8">
											<div className="mb-4">
												<div className="form__group p-3">
													<input
														className="form__input"
														type="text"
														name="job_role"
														id="job_role"
														placeholder=" "
														onChange={this.handleChange}
														onFocus={this.handleFocus}
														value={this.state.job_role}
													/>
													<label htmlFor="job_role" className="form__label">Job Role</label>
												</div>
												{this.state.error && <div className="m-2 invalid-error">{this.state.error.job_role}</div>}
											</div>
										</Col>
									</Row>
								</Container>
							</form>
						</div>
					</div>
				</Container >
			</DashLayout >
		)
	}
}

export default NewAssessment;