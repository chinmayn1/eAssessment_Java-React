import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DashLayout from "./DashLayout";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledButton, SpanText } from "../Components/StyledComponents"
import { Redirect } from "react-router-dom"
import 'quill/dist/quill.snow.css';
import axios from "axios";
import { get_Authorization_header } from "../Components/TokenParser"


class QuestionLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			goBackToAddPage: false,
			assessment_id: this.props.assessmentID,
			id: this.props.id,
			backToAddPage: false,
			role: this.props.role
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.validator(this.props.payload)
		if (this.props.validator(this.props.payload).total_error === 0) {
			axios({
				url: this.state.role ? process.env.REACT_APP_.BACKEND_URL + "/new-assessment/question/update/" + this.state.id : process.env.REACT_APP_BACKEND_URL + "/new-assessment/question/create",
				method: this.state.role ? "PUT" : "POST",
				data: this.props.payload,
				responseType: "json",
				headers: get_Authorization_header()
			})
				.then((res) => {
					console.log(res);
					if (res.status) {
						console.log("ADDED QUES")
						// this.props.history.push("/add-questions",[{"assessment_id":this.state.assessment_id}])
						this.props.history.push("/add-questions")
					}
				})
				.catch(error => console.log(error))
		}
	}
	render() {
		if (!this.state.assessment_id && !this.state.id) {
			this.props.history.push("/new-assessment")
		}

		if (this.state.goBackToAddPage) {
			return <Redirect to={{
				pathname: "/add-questions"
			}} />
		}

		return (
			<DashLayout title={this.props.title}>
				<Container className="my-5">
					<div className="box my-3 p-3">
						<form onSubmit={this.handleSubmit}>
							<Row className="p-2 m-2 justify-content-between">
								<Row>
									<Col>
										<StyledButton onClick={() => { this.setState({ goBackToAddPage: true }) }} paddingX="1rem"><FontAwesomeIcon icon={faAngleLeft} /></StyledButton>
										<SpanText>{this.props.headingText}</SpanText>
									</Col>
								</Row>
								<Row>
									<Col>
										<StyledButton bgColor="#747474" shadeColor="#6c6a6a" >cancel</StyledButton>
									</Col>
									<Col>
										<StyledButton type="submit" bgColor="#28a745" shadeColor="#208b39">{this.state.role ? "update" : "save"}</StyledButton>
									</Col>
								</Row>
							</Row>
							<Container className="mt-4 mb-5 mx-auto">
								{this.props.children[0].key !== null && this.props.children[0]}
								<Row>
									{this.props.children.map((child) => child.key === null ? (child) : "")}
								</Row>
							</Container>
						</form>
					</div>
				</Container>
			</DashLayout>
		)
	}

}

export default QuestionLayout