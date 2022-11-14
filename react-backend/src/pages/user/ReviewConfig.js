import React, { Component } from "react";
import DashLayout from "../../layout/DashLayout";
import { Col, Container, Row, Table } from "react-bootstrap";
import Stepper from '../../Components/Stepper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faAngleDown, faAngleUp, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { get_assessment_id } from "../../Components/TokenParser";
import { Redirect } from "react-router";
import Api from "../../Components/Api";

class ReviewConfig extends Component {
	constructor(props) {
		super(props)
		this.state = {
			questionArr: null,
			assessment_id: get_assessment_id()
		}

	}
	componentDidMount() {
		if (this.state.assessment_id) {
			Api.get("/new-assessment/question/all/" + this.state.assessment_id)
				.then((res) => {
					if (res.status) {
						console.log(res.data)
						this.setState({ questionArr: res.data.question })
					}
				})
				.catch((error) => console.log(error))
		}
	}
	//! Remove item from data array
	RemoveMember = (id) => {
		let result = [];
		this.state.questionArr.map((i) => {
			if (i.id !== id)
				result.push(i);
			return result;
		})
	}

	//! Swapping two items
	Swapper(Arr, CurrentIndex, NextIndex) {
		const firstElement = Arr[CurrentIndex];
		const secondElement = Arr[NextIndex];
		Arr[NextIndex] = firstElement;
		Arr[CurrentIndex] = secondElement;
		return [Arr, firstElement.id, secondElement.id];
	}

	handlePosition(updateID = null, swapID = null) {
		if (updateID && swapID) {
			const payload = { "updateID": updateID, "swapID": swapID }
			Api.put("/new-assessment/question/orderby", payload)
				.then((res) => { console.log(res.data) })
				.catch((error) => console.log(error))
		}
	}
	//! Deleting Questions
	handleDelete = (id = undefined) => {
		if (id) {
			this.setState({ questionArr: this.RemoveMember(id) })
			Api.delete('/new-assessment/question/delete/' + id)
				.then((res) => {
					console.log(res.data)
					this.setState({ successMessage: res.data.data.message, tag: res.data.data.tag });
				})
				.catch((error) => { console.log(error); this.setState({ message: error.response.data.message, tag: error.response.data.tag }) })
		}
	}
	//! Editing Question
	handleEdit = (id = undefined, qtype = undefined) => {
		const types = {
			"MCQ": "/add-questions/multiple-choice",
			"File Upload": "/add-questions/file-upload",
			"Coding": "/add-questions/coding",
			"Essay": "/add-questions/essay",
			"Video Record": "/add-questions/video-record"
		}
		if (id && qtype) {
			console.log(this.props.location.state[0].assessment_id)
			this.props.history.push(types[qtype], [{ assessment_id: this.props.location.state[0].assessment_id, id: id, status: "update" }])
		}
	}
	handleUpArrow(CurrentIndex) {
		const arr = this.state.questionArr;
		if (CurrentIndex === 0) return
		const resultArr = this.Swapper(arr, CurrentIndex, CurrentIndex - 1);
		this.handlePosition(resultArr[1], resultArr[2], CurrentIndex, CurrentIndex - 1)
		this.setState({ questionArr: resultArr[0] })
	}
	handleDownArrow(CurrentIndex) {
		const arr = this.state.questionArr;
		if (CurrentIndex + 1 === arr.length) return
		const resultArr = this.Swapper(arr, CurrentIndex, CurrentIndex + 1);
		this.handlePosition(resultArr[1], resultArr[2], CurrentIndex, CurrentIndex + 1)
		this.setState({ questionArr: resultArr[0] })
	}


	render() {
		if (!get_assessment_id()) {
			return <Redirect to="/new-assessment" />
		}
		return (
			<DashLayout title="New Assessment">
				<Container className="p-3 mx-auto mt-5">
					<div className="my-4 p-3 bg-light box">
						<div className="my-2">
							<Stepper currentstep={3} history={this.props} previousstep="/add-questions" />
							<Container>
								<Row className="p-3 ml-5">
									<Col><h3>Review & Configure your assessment</h3></Col>
								</Row>
								<Row className="p-3 ml-5">
									<Col><h4>Test List</h4></Col>
									<Col md={12}>
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>Type</th>
													<th>Time</th>
													<th>Question</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												{
													this.state.questionArr &&
													this.state.questionArr.map((item, index) =>
														<tr key={index}>

															<td>{item.question_type}</td>
															<td>{item.time}</td>
															<td>{item.name}</td>
															<td>
																<div className="d-flex justify-content-around">
																	<button type="button" className="actions-btn">
																		<FontAwesomeIcon icon={faAngleUp} onClick={() => this.handleUpArrow(index)} />
																	</button>
																	<button type="button" className="actions-btn">
																		<FontAwesomeIcon icon={faAngleDown} onClick={() => this.handleDownArrow(index)} />
																	</button>
																	<button type="button" className="actions-btn">
																		<FontAwesomeIcon icon={faEdit} onClick={() => this.handleEdit(item.id, item.question_type)} />
																	</button>
																	<button type="button" className="actions-btn">
																		<FontAwesomeIcon icon={faMinusCircle} onClick={() => this.handleDelete(item.id)
																		} />
																	</button>
																</div>
															</td>
														</tr>
													)
												}
											</tbody>
										</Table>
									</Col>
								</Row>
							</Container>
						</div>
					</div>
				</Container >
			</DashLayout >
		)
	}
}

export default ReviewConfig;