import React, { useEffect, useState } from "react"
import DashLayout from "../../layout/DashLayout"
import { Row, Col, Container, Accordion, Card, Button, Table } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUserAltSlash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { StyledButton, RequiredStar, DropDown, DropDownList, DropDownListItem } from "../../Components/StyledComponents";
import { Validator } from "../../Components/Validator";
import Api from "../../Components/Api";
const AssessmentInvitation = (props) => {
	if (!props.location.state) {
		props.history.goBack();
	}
	const payload = { first_name: '', last_name: '', email: '' };
	const [value, setValue] = useState(payload);
	const [candidates, setCandidates] = useState();
	const [error, setError] = useState();
	const [res, setRes] = useState();
	const assessment_id = props.location.state
	const handleChange = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
	}

	//Get Candiates that are invited
	useEffect(() => {
		Api.get(`/candidates/${assessment_id}`)
			.then(res => { console.log(res); setCandidates(res.data.candidate) })
			.catch(err => console.log(err))
		console.log(candidates)
	}, [])

	//Invite Candidates
	const handleSubmit = e => {
		e.preventDefault();
		setError(Validator(value))
		if (Validator(value).total_error === 0) {
			value.assessment_id = assessment_id;
			Api.post("/candidates/create", value)
				.then(res => {
					if (res.status) {
						console.log(res);
						setRes(res.data);
						setCandidates([...candidates, res.data.candidate[0]]);
						setValue(payload)
					}
				})
				.catch(err => {
					if (err.response) {
						console.log(err.response)
						setRes(err.response.data)
					}
				})
		}
	}
	//for removing user
	const handleRemove = (id = undefined, index = undefined) => {
		if (id) {
			Api.delete(`/candidates/delete/${id}`)
				.then(res => {
					if (res.status) {
						delete candidates[index];
						setRes(res.data);
					}
				})
				.catch(err => {
					if (err.response) {
						setRes(res.datat)
					}
				})
		}
	}
	// for showing dropdown 
	const handleDropDownList = (index) => {
		const drop = document.getElementById('show-' + index)
		if (!drop.classList.contains("show"))
			drop.classList.add("show")
		else
			drop.classList.remove("show")
	}
	return (
		<DashLayout title="Assessment Edit">
			<Container className="p-3 mx-auto mt-5">
				<div className="my-4 p-3 bg-light box">
					<Row className="mx-2 my-5">
						<Col xs={12} className="d-flex">
							<StyledButton paddingX={"1rem"} type="button" onClick={() => props.history.goBack()}><FontAwesomeIcon icon={faAngleLeft} /></StyledButton>
							<h4 className="m-2">{props.match.params.name}</h4>
							{/* <button>edit</button> */}
						</Col>
						{/* Display Message */}
						{
							res && (<div className="col p-2">
								<div className={`alert alert-${res.tag}`}>{res.message}</div></div>)
						}
						<Col xs={12} className="m-2 p-2">
							<Accordion>
								<Card>
									<Accordion.Toggle as={Card.Header} eventKey="0" >Invite Candidates</Accordion.Toggle>
								</Card>
								<Accordion.Collapse eventKey="0">
									<form onSubmit={handleSubmit}>
										<Row className="p-3">
											<Col xs={12} md={6}>
												<div className="mb-4">
													<div className="form__group p-3">
														<input
															className="form__input"
															type="text"
															name="first_name"
															id="first_name"
															placeholder=" "
															onChange={handleChange}
														/>
														<label htmlFor="first_name" className="form__label">First Name<RequiredStar />
														</label>
													</div>
													{
														error && (<div className="m-2 invalid-error">{error.first_name}</div>)
													}
												</div>
											</Col>
											<Col xs={12} md={6}>
												<div className="mb-4">
													<div className="form__group p-3">
														<input
															className="form__input"
															type="text"
															name="last_name"
															id="last_name"
															placeholder=" "
															onChange={handleChange}
														/>
														<label htmlFor="last_name" className="form__label">Last Name<RequiredStar /></label>
													</div>
													{
														error && (<div className="m-2 invalid-error">{error.last_name}</div>)
													}
												</div>
											</Col>
											<Col xs={12} md={6}>
												<div className="mb-4">
													<div className="form__group p-3">
														<input
															className="form__input"
															type="text"
															name="email"
															id="email"
															placeholder=" "
															onChange={handleChange}
														/>
														<label htmlFor="email" className="form__label">Email<RequiredStar /></label>
													</div>
													{
														error && (<div className="m-2 invalid-error">{error.email}</div>)
													}
												</div>
											</Col>
											<Col md={6} xs={12}>
												<Button type="submit" className="float-right" variant="success">Invite</Button>
											</Col>
										</Row>
									</form>
								</Accordion.Collapse>
							</Accordion>
						</Col>
					</Row>
					<Row className="mx-2">
						<Container fluid className="p-xs-0">
							<Row className="p-2">
								<Col><h3>Candidate</h3></Col>
								<Col className="d-flex">
									<div className="mx-1 w-50">
										<div className="form__group p-3">
											<select className="form__input" name="stage" id="stage">
												<option value="">Stage</option>
												<option value="Not yet evaluated">Not yet evaluated</option>
												<option value="">Evaluated</option>
												<option>Offer Sent</option>
												<option>Offer Declined</option>
												<option>Candidate unresponsive</option>
												<option>Hired</option>
												<option>Rejected</option>
											</select>
										</div>
									</div>
									<div className="w-50">
										<div className="form__group p-3">
											<select className="form__input" name="status" id="status">
												<option value="">Status</option>
												<option value="Invited">Invited</option>
												<option value="Started">Started</option>
												<option value="Completed">Completed</option>
											</select>
										</div>
									</div>
								</Col>
							</Row>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Name</th>
										<th>Invited On</th>
										<th>Score</th>
										<th>Stage</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{
										candidates && candidates.map((item, index) =>
											<tr key={index}>
												<td>{item.firstName}</td>
												<td>{item.timestamp}</td>
												<td>65%</td>
												<td>Not yet evaluated Rejected</td>
												<td>
													<div className="d-flex justify-content-around">
														<button className="actions-btn">
															<FontAwesomeIcon icon={faUserAltSlash} />
														</button>
														<DropDown>
															<button className="actions-btn" >
																<FontAwesomeIcon icon={faEllipsisV} onClick={() => handleDropDownList(index)} />
															</button>
															<DropDownList id={`show-${index}`} >
																<DropDownListItem type="button">Send result by email</DropDownListItem>
																<DropDownListItem type="button" onClick={() => handleRemove(item.id, index)} >Delete Candidate</DropDownListItem>
															</DropDownList>
														</DropDown>
														<button className="actions-btn">
															<FontAwesomeIcon icon={faAngleRight} />
														</button>
													</div>
												</td>
											</tr>
										)
									}
								</tbody>
							</Table>
						</Container>
					</Row>
				</div >
			</Container >
		</DashLayout >
	)
}

export default AssessmentInvitation